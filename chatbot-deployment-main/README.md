# Vortexus Website Chatbot API

This is a lightweight Flask API designed for cPanel Python App hosting. It does not use PyTorch, NLTK, or model training.

The API can optionally call an OpenAI-compatible LLM provider to turn retrieved JSON/catalog context into polished customer answers. If the LLM is not configured or fails, the API falls back to the local JSON answer.

## Content Structure

Chatbot content lives in JSON:

```text
data/knowledge.json
data/flows.json
data/catalog.json
```

Use `knowledge.json` for normal FAQ/product/service answers. Use `flows.json` for guided question flows such as RFQs, pump selection, and water-treatment enquiries. Use `catalog.json` for searchable website products, brands, categories, and industries.

`catalog.json` is generated from the React website data. Rebuild it from the repository root after product/catalog changes:

```bash
node chatbot-deployment-main/scripts/build_catalog_index.mjs
```

## Local Run

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Test:

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"message":"What products do you supply?"}'
```

Start a guided flow:

```bash
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"message":"Start pump selection","flow_id":"pump-selection"}'
```

## cPanel Python App Settings

Use these values when creating the Python application:

```text
Python version: 3.12 if available, otherwise 3.11 or 3.10
Application root: chatbot-deployment-main
Application startup file: passenger_wsgi.py
Application entry point: application
```

If the frontend and chatbot are on different domains/subdomains, add this environment variable:

```text
CHATBOT_ALLOWED_ORIGINS=https://vortexusindustrial.com,https://www.vortexusindustrial.com
```

Optional LLM environment variables:

```text
CHATBOT_LLM_ENABLED=1
CHATBOT_LLM_API_KEY=your-rotated-provider-key
CHATBOT_LLM_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
CHATBOT_LLM_MODEL=qwen-plus
CHATBOT_LLM_TIMEOUT=20
CHATBOT_LLM_TEMPERATURE=0.2
```

Do not store real API keys in this README, frontend code, or Git. Add them only through cPanel's environment variable interface.

After creating the app, install dependencies from cPanel's terminal or Python App interface:

```bash
pip install -r requirements.txt
```
