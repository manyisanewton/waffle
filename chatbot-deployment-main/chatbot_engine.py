import json
import os
import re
from difflib import SequenceMatcher
from pathlib import Path

from llm_client import LLMError, complete_answer, llm_is_configured


BASE_DIR = Path(__file__).resolve().parent
TOKEN_PATTERN = re.compile(r"[a-z0-9]+")
MIN_CONFIDENCE = 0.22
LLM_ENABLED = os.environ.get("CHATBOT_LLM_ENABLED", "1") != "0"


def load_json(filename):
    with (BASE_DIR / "data" / filename).open("r", encoding="utf-8") as file:
        return json.load(file)


KNOWLEDGE = load_json("knowledge.json")
FLOW_DEFINITIONS = load_json("flows.json")["flows"]
CATALOG = load_json("catalog.json")
STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "brand",
    "brands",
    "category",
    "do",
    "for",
    "have",
    "in",
    "list",
    "me",
    "of",
    "product",
    "products",
    "show",
    "the",
    "under",
    "what",
    "which",
    "you",
}


def normalize(text):
    return " ".join(TOKEN_PATTERN.findall(str(text).lower()))


def tokenize(text):
    return set(TOKEN_PATTERN.findall(str(text).lower()))


def query_tokens(text):
    tokens = {token for token in tokenize(text) if token not in STOPWORDS and len(token) > 1}
    singulars = {token[:-1] for token in tokens if token.endswith("s") and len(token) > 3}
    return tokens.union(singulars)


def expand_keywords(entry):
    keywords = set(entry.get("keywords", []))
    for keyword in list(keywords):
        key = normalize(keyword).replace(" ", "_")
        keywords.update(KNOWLEDGE.get("synonyms", {}).get(key, []))
    return [keyword for keyword in keywords if keyword]


def score_entry(message, entry):
    normalized_message = normalize(message)
    message_tokens = tokenize(message)
    score = 0.0

    for keyword in expand_keywords(entry):
        normalized_keyword = normalize(keyword)
        keyword_tokens = tokenize(keyword)

        if not normalized_keyword:
            continue

        if normalized_keyword in normalized_message:
            score += 6 + len(keyword_tokens)
            continue

        overlap = message_tokens.intersection(keyword_tokens)
        if overlap:
            score += len(overlap) * 2

        similarity = SequenceMatcher(None, normalized_message, normalized_keyword).ratio()
        if similarity > 0.72:
            score += similarity * 2

    return score


def confidence_from_score(score, top_score):
    if top_score <= 0:
        return 0
    return min(round(score / max(top_score, 12), 2), 1)


def link(label, url):
    return {"label": label, "url": url}


def compact_product(product):
    return {
        "name": product.get("name", ""),
        "summary": product.get("summary", ""),
        "url": product.get("url", ""),
        "brand": product.get("brand", ""),
        "category": product.get("categoryName", ""),
        "subcategory": product.get("subcategory", ""),
        "industries": product.get("industryNames", []),
        "image": product.get("image", ""),
        "visual_reference_only": product.get("visualReferenceOnly", False),
    }


def score_catalog_item(message, item, fields):
    normalized_message = normalize(message)
    tokens = query_tokens(message)
    text = normalize(" ".join(str(item.get(field, "")) for field in fields))
    text_tokens = tokenize(text)
    name = normalize(item.get("name") or item.get("title") or "")
    score = 0.0

    if name and name == normalized_message:
        score += 40
    elif name and name in normalized_message:
        score += 24
    elif normalized_message and normalized_message in name:
        score += 18

    overlap = tokens.intersection(text_tokens)
    if overlap:
        score += len(overlap) * 5

    if name:
        similarity = SequenceMatcher(None, normalized_message, name).ratio()
        if similarity > 0.62:
            score += similarity * 10

    return score


def build_subcategory_index():
    groups = {}
    for product in CATALOG["products"]:
        subcategory = product.get("subcategory")
        category_slug = product.get("categorySlug")
        if not subcategory or not category_slug:
            continue
        key = f"{category_slug}:{normalize(subcategory)}"
        if key not in groups:
            groups[key] = {
                "name": subcategory,
                "categoryName": product.get("categoryName", ""),
                "categorySlug": category_slug,
                "url": f"/products/category/{category_slug}",
                "products": [],
                "searchText": f"{subcategory} {product.get('categoryName', '')}",
            }
        groups[key]["products"].append(product)
        groups[key]["searchText"] += f" {product.get('name', '')} {product.get('summary', '')}"
    return list(groups.values())


SUBCATEGORIES = build_subcategory_index()


def best_catalog_matches(message):
    collections = [
        ("product", CATALOG["products"], ["name", "brand", "categoryName", "subcategory", "searchText"]),
        ("brand", CATALOG["brands"], ["name", "searchText"]),
        ("category", CATALOG["categories"], ["name", "description", "searchText"]),
        ("subcategory", SUBCATEGORIES, ["name", "categoryName", "searchText"]),
        ("industry", CATALOG["industries"], ["name", "description", "searchText"]),
    ]

    scored = []
    for result_type, items, fields in collections:
        for item in items:
            score = score_catalog_item(message, item, fields)
            if score > 0:
                scored.append((score, result_type, item))

    return sorted(scored, key=lambda row: row[0], reverse=True)


def sort_products_for_message(message, products):
    return sorted(
        products,
        key=lambda product: (
            -score_catalog_item(message, product, ["name", "subcategory"]),
            -score_catalog_item(
                message,
                product,
                ["name", "brand", "categoryName", "subcategory", "summary", "searchText"],
            ),
            product.get("name", ""),
        ),
    )


def should_prefer_catalog(message, best_type, best_score):
    normalized_message = normalize(message)
    catalog_words = [
        "brand",
        "category",
        "do you have",
        "do you sell",
        "industry",
        "list",
        "product",
        "products",
        "show",
        "under",
    ]
    return best_score >= 14 or best_type in {"brand", "category", "subcategory", "industry"} and any(
        word in normalized_message for word in catalog_words
    )


def is_catalog_query(message):
    normalized_message = normalize(message)
    catalog_words = [
        "brand",
        "brands",
        "category",
        "do you have",
        "do you sell",
        "industry",
        "list",
        "product",
        "products",
        "show",
        "under",
    ]
    return any(word in normalized_message for word in catalog_words)


def item_name_matches(message, item):
    normalized_message = normalize(message)
    name = normalize(item.get("name") or item.get("title") or "")
    return bool(name and (name in normalized_message or normalized_message in name))


def item_name_token_matches(message, item):
    tokens = query_tokens(message)
    name_tokens = query_tokens(item.get("name") or item.get("title") or "")
    return bool(tokens.intersection(name_tokens))


def catalog_response(message):
    matches = best_catalog_matches(message)
    if not matches:
        return None

    selected = matches[0]
    if is_catalog_query(message):
        exact_brand = next(
            (match for match in matches if match[1] == "brand" and item_name_matches(message, match[2])),
            None,
        )
        exact_hierarchy = next(
            iter(
                sorted(
                    [
                        match
                        for match in matches
                        if match[1] in {"category", "subcategory", "industry"}
                        and (
                            item_name_matches(message, match[2])
                            or item_name_token_matches(message, match[2])
                        )
                    ],
                    key=lambda match: (
                        0
                        if "products" in normalize(message) and match[1] == "category"
                        else 1,
                        -match[0],
                    ),
                )
            ),
            None,
        )
        hierarchy_match = next(
            (
                match
                for match in matches
                if match[1] in {"category", "subcategory", "industry"} and match[0] >= 5
            ),
            None,
        )
        brand_match = next(
            (match for match in matches if match[1] == "brand" and match[0] >= 5),
            None,
        )
        selected = exact_brand or exact_hierarchy or hierarchy_match or brand_match or selected

    best_score, result_type, item = selected
    if not should_prefer_catalog(message, result_type, best_score):
        return None

    if result_type == "product":
        products = [item]
        related = [
            product
            for product in CATALOG["products"]
            if product.get("slug") != item.get("slug")
            and (
                product.get("categorySlug") == item.get("categorySlug")
                or product.get("subcategory") == item.get("subcategory")
                or product.get("brand") == item.get("brand")
            )
        ][:4]
        products.extend(related)
        subcategory_label = f" / {item.get('subcategory')}" if item.get("subcategory") else ""
        answer = (
            f"I found {item['name']} in the catalog. It is listed under "
            f"{item.get('categoryName', 'the product catalog')}{subcategory_label}. "
            f"{item.get('summary', '')}"
        )
        title = item["name"]
        links = [link("View product", item["url"]), link("Request a quote", "/request-quote")]
        total = 1
    elif result_type == "brand":
        products = sort_products_for_message(message, item.get("products", []))
        answer = (
            f"{item['name']} is listed as a brand/range on the website. "
            f"I found {len(products)} related catalog or visual reference items. "
            "Here are the strongest matches."
        )
        title = item["name"]
        links = [link(f"View {item['name']}", item["url"]), link("Request a quote", "/request-quote")]
        total = len(products)
    elif result_type == "category":
        products = sort_products_for_message(message, item.get("products", []))
        subcategories = ", ".join(item.get("subcategories", [])[:8])
        answer = (
            f"{item['name']} includes {item.get('productCount', len(products))} indexed products. "
            f"Key subcategories include {subcategories}. Here are sample matching products."
        )
        title = item["name"]
        links = [link(f"View {item['name']}", item["url"]), link("Request a quote", "/request-quote")]
        total = item.get("productCount", len(products))
    elif result_type == "subcategory":
        products = sort_products_for_message(message, item.get("products", []))
        answer = (
            f"{item['name']} is a subcategory under {item.get('categoryName')}. "
            f"I found {len(products)} matching products. Here are the top matches."
        )
        title = item["name"]
        links = [link(f"View {item.get('categoryName')}", item["url"]), link("Request a quote", "/request-quote")]
        total = len(products)
    else:
        products = sort_products_for_message(message, item.get("products", []))
        categories = ", ".join(item.get("categoryNames", [])[:6])
        answer = (
            f"For {item['name']}, the relevant product areas include {categories}. "
            f"I found {item.get('productCount', len(products))} related products. Here are sample matches."
        )
        title = item["name"]
        links = [link(f"View {item['name']}", item["url"]), link("Request a quote", "/request-quote")]
        total = item.get("productCount", len(products))

    return {
        "answer": answer,
        "matches": [
            {
                "id": item.get("slug") or item.get("id") or title,
                "title": title,
                "category": f"catalog:{result_type}",
                "score": round(best_score, 2),
                "confidence": confidence_from_score(best_score, best_score),
            }
        ],
        "links": links,
        "quick_replies": [
            "Request a quote",
            "Help me choose a pump",
            "Help me choose water treatment",
            "Contact Vortexus",
        ],
        "confidence": confidence_from_score(best_score, best_score),
        "flow_state": None,
        "catalog_results": {
            "type": result_type,
            "title": title,
            "total": total,
            "items": [compact_product(product) for product in products[:6]],
        },
    }


def is_greeting(message):
    normalized_message = normalize(message)
    greetings = {
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening",
        "who are you",
        "how are you",
    }
    if normalized_message in greetings:
        return True
    return (
        normalized_message.startswith(("hello", "hi ", "hey", "good morning", "good afternoon", "good evening"))
        or "who are you" in normalized_message
        or "how are you" in normalized_message
    )


def greeting_response():
    return {
        "answer": (
            "Hello. I am the Vortexus website assistant. I can help with products, brands, "
            "categories, industries, water-treatment questions, pump selection, RFQs, and contact details."
        ),
        "matches": [],
        "links": [{"label": "Contact Vortexus", "url": "/contact-us"}],
        "quick_replies": [
            "Show products",
            "Help me choose a pump",
            "Help me choose water treatment",
            "Request a quote",
        ],
        "confidence": 1,
        "flow_state": None,
    }


def is_flow_cancel_or_switch(message):
    normalized_message = normalize(message)
    switch_phrases = [
        "cancel",
        "stop",
        "nevermind",
        "never mind",
        "change topic",
        "different product",
        "another product",
        "new question",
        "start over",
        "forget that",
    ]
    return any(phrase in normalized_message for phrase in switch_phrases)


def is_topic_switch_intent(message):
    normalized_message = normalize(message)
    switch_intents = [
        "i want a quote",
        "request a quote",
        "quote",
        "rfq",
        "show products",
        "browse products",
        "main product categories",
        "help me choose",
        "which products",
        "what products",
        "do you have",
        "do you sell",
        "brand",
        "category",
    ]
    return any(intent in normalized_message for intent in switch_intents)


def should_interrupt_flow(message):
    if (
        is_greeting(message)
        or is_flow_cancel_or_switch(message)
        or is_topic_switch_intent(message)
        or flow_from_message(message)
    ):
        return True

    tokens = query_tokens(message)
    if len(tokens) <= 2:
        return False

    catalog_match = catalog_response(message)
    if catalog_match and catalog_match.get("confidence", 0) >= 0.55:
        return True

    return False


def format_flow_summary(answers):
    return "\n".join(
        f"- {item['label']}: {item['answer']}" for item in answers if item.get("answer")
    )


def start_flow(flow_id):
    flow = FLOW_DEFINITIONS[flow_id]
    first_step = flow["steps"][0]
    return {
        "answer": f"{flow['intro']}\n\n{first_step['question']}",
        "matches": [],
        "links": [],
        "quick_replies": [],
        "confidence": 1,
        "flow_state": {
            "id": flow_id,
            "title": flow["title"],
            "step_index": 0,
            "answers": [],
            "is_complete": False,
        },
        "skip_llm": True,
    }


def continue_flow(message, flow_state):
    flow_id = flow_state.get("id")
    flow = FLOW_DEFINITIONS.get(flow_id)
    if not flow:
        return build_response(message)

    step_index = int(flow_state.get("step_index", 0))
    steps = flow["steps"]
    answers = list(flow_state.get("answers", []))

    if step_index < len(steps):
        current_step = steps[step_index]
        answers.append(
            {
                "id": current_step["id"],
                "label": current_step["question"],
                "answer": message.strip(),
            }
        )

    next_index = step_index + 1
    if next_index >= len(steps):
        summary = format_flow_summary(answers)
        return {
            "answer": flow["completion"].format(summary=summary),
            "matches": [],
            "links": [
                {"label": "Request a quote", "url": "/request-quote"},
                {"label": "WhatsApp Vortexus", "url": "https://wa.me/254710869870"},
            ],
            "quick_replies": ["Contact Vortexus", "What products do you supply?"],
            "confidence": 1,
            "flow_state": {
                "id": flow_id,
                "title": flow["title"],
                "step_index": next_index,
                "answers": answers,
                "is_complete": True,
            },
        }

    return {
        "answer": steps[next_index]["question"],
        "matches": [],
        "links": [],
        "quick_replies": [],
        "confidence": 1,
        "flow_state": {
            "id": flow_id,
            "title": flow["title"],
            "step_index": next_index,
            "answers": answers,
            "is_complete": False,
        },
        "skip_llm": True,
    }


def flow_from_message(message):
    normalized_message = normalize(message)
    if any(term in normalized_message for term in ["start rfq", "start quote guide", "start quotation guide"]):
        return "rfq"
    if any(term in normalized_message for term in ["start pump", "start pump selection"]):
        return "pump-selection"
    if any(term in normalized_message for term in ["start water", "start water treatment", "start treatment guide"]):
        return "water-treatment"
    return None


def entry_by_id(entry_id):
    return next((entry for entry in KNOWLEDGE["entries"] if entry["id"] == entry_id), None)


def response_from_entry(entry):
    return {
        "answer": entry["answer"],
        "matches": [
            {
                "id": entry["id"],
                "title": entry["title"],
                "category": entry.get("category", "general"),
                "score": 1,
                "confidence": 1,
            }
        ],
        "links": entry.get("links", []),
        "quick_replies": entry.get("quick_replies", []),
        "confidence": 1,
        "flow_state": None,
    }


def broad_advisory_response(message):
    normalized_message = normalize(message)
    route_map = [
        (
            "rfq",
            ["i want a quote", "request a quote", "what information should i provide", "quote information"],
        ),
        (
            "pumps",
            ["help me choose the right pump", "help me choose a pump", "choose pump", "pump selection"],
        ),
        (
            "water-treatment",
            [
                "help me choose the right water treatment",
                "help me choose water treatment",
                "water treatment solution",
                "choose water treatment",
            ],
        ),
        (
            "products",
            ["main product categories", "show me the main product", "browse products", "show products"],
        ),
    ]

    for entry_id, phrases in route_map:
        if any(phrase in normalized_message for phrase in phrases):
            entry = entry_by_id(entry_id)
            if entry:
                return response_from_entry(entry)

    return None


def build_response(message):
    maybe_flow_id = flow_from_message(message)
    if maybe_flow_id:
        return start_flow(maybe_flow_id)

    if is_greeting(message):
        return greeting_response()

    advisory_match = broad_advisory_response(message)
    if advisory_match:
        return advisory_match

    catalog_match = catalog_response(message)
    if catalog_match:
        return catalog_match

    scored_entries = sorted(
        (
            {
                "id": entry["id"],
                "title": entry["title"],
                "category": entry.get("category", "general"),
                "score": round(score_entry(message, entry), 2),
                "answer": entry["answer"],
                "links": entry.get("links", []),
                "quick_replies": entry.get("quick_replies", []),
            }
            for entry in KNOWLEDGE["entries"]
        ),
        key=lambda item: item["score"],
        reverse=True,
    )

    top_score = scored_entries[0]["score"] if scored_entries else 0
    best = scored_entries[0]
    confidence = confidence_from_score(best["score"], top_score)

    if confidence < MIN_CONFIDENCE:
        return {
            "answer": KNOWLEDGE["fallback_answer"],
            "matches": [],
            "links": [{"label": "Contact Vortexus", "url": "/contact-us"}],
            "quick_replies": [
                "Help me choose a pump",
                "Help me choose water treatment",
                "Request a quote",
            ],
            "confidence": confidence,
            "flow_state": None,
        }

    matches = [
        {
            "id": item["id"],
            "title": item["title"],
            "category": item["category"],
            "score": item["score"],
            "confidence": confidence_from_score(item["score"], top_score),
        }
        for item in scored_entries[:3]
        if item["score"] > 0
    ]

    return {
        "answer": best["answer"],
        "matches": matches,
        "links": best["links"],
        "quick_replies": best["quick_replies"],
        "confidence": confidence,
        "flow_state": None,
    }


def get_response(message, flow_id=None, flow_state=None):
    if flow_state and not flow_state.get("is_complete"):
        if should_interrupt_flow(message):
            response = build_response(message)
            response.setdefault("meta", {})
            response["meta"]["flow_interrupted"] = True
            return maybe_polish_answer(message, response)
        return maybe_polish_answer(message, continue_flow(message, flow_state))

    if flow_id:
        return maybe_polish_answer(message, start_flow(flow_id))

    return maybe_polish_answer(message, build_response(message))


def maybe_polish_answer(message, response):
    response.setdefault("meta", {})
    response["meta"]["llm_used"] = False

    if response.pop("skip_llm", False):
        response["meta"]["llm_status"] = "skipped"
        return response

    if not LLM_ENABLED or not llm_is_configured():
        response["meta"]["llm_status"] = "not_configured"
        return response

    try:
        response["answer"] = complete_answer(message, response)
        response["meta"]["llm_used"] = True
        response["meta"]["llm_status"] = "ok"
    except LLMError as error:
        response["meta"]["llm_status"] = "fallback"
        response["meta"]["llm_error"] = str(error)

    return response
