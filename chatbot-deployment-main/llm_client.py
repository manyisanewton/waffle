import json
import os
import urllib.error
import urllib.request


DEFAULT_MODEL = "qwen-plus"
SYSTEM_PROMPT = """You are the Vortexus Industrial Excellence website assistant.
Answer customers clearly and professionally using only the provided context.
Do not invent prices, stock availability, delivery dates, certifications, or technical specifications.
If the context is not enough, say what is missing and ask a useful follow-up question.
Keep answers concise, helpful, and sales-support oriented.
When relevant, encourage the customer to request a quote or contact Vortexus.
"""


class LLMError(RuntimeError):
    pass


def llm_is_configured():
    return bool(os.environ.get("CHATBOT_LLM_API_KEY"))


def build_user_prompt(message, response_context):
    context = {
        "draft_answer": response_context.get("answer", ""),
        "matches": response_context.get("matches", []),
        "links": response_context.get("links", []),
        "catalog_results": response_context.get("catalog_results"),
        "flow_state": response_context.get("flow_state"),
    }

    return (
        "Customer question:\n"
        f"{message}\n\n"
        "Retrieved website JSON context:\n"
        f"{json.dumps(context, ensure_ascii=False, indent=2)}\n\n"
        "Write the final answer for the customer. Do not mention JSON, context, retrieval, or internal scoring."
    )


def complete_answer(message, response_context):
    api_key = os.environ.get("CHATBOT_LLM_API_KEY")
    if not api_key:
        raise LLMError("CHATBOT_LLM_API_KEY is not configured.")

    base_url = os.environ.get("CHATBOT_LLM_BASE_URL", "https://dashscope.aliyuncs.com/compatible-mode/v1")
    model = os.environ.get("CHATBOT_LLM_MODEL", DEFAULT_MODEL)
    timeout = float(os.environ.get("CHATBOT_LLM_TIMEOUT", "20"))
    temperature = float(os.environ.get("CHATBOT_LLM_TEMPERATURE", "0.2"))
    enable_thinking = os.environ.get("CHATBOT_LLM_ENABLE_THINKING", "0") == "1"
    max_tokens = int(os.environ.get("CHATBOT_LLM_MAX_TOKENS", "300"))

    url = f"{base_url.rstrip('/')}/chat/completions"
    body = {
        "model": model,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": build_user_prompt(message, response_context)},
        ],
        "temperature": temperature,
        "enable_thinking": enable_thinking,
        "max_tokens": max_tokens,
    }

    request = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8", errors="replace")
        raise LLMError(f"LLM provider returned HTTP {error.code}: {detail}") from error
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError) as error:
        raise LLMError(f"LLM request failed: {error}") from error

    try:
        answer = payload["choices"][0]["message"]["content"].strip()
    except (KeyError, IndexError, TypeError) as error:
        raise LLMError("LLM provider response did not include an answer.") from error

    if not answer:
        raise LLMError("LLM provider returned an empty answer.")

    return answer
