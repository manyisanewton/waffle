# Vortexus Website

React frontend with a Flask chatbot backend for product, catalog, and RFQ support.

## Chatbot Deployment Notes

Keep LLM API keys only in `chatbot-deployment-main/.env` or in cPanel Python App environment variables. Do not put real keys in this README, frontend code, or any committed file.

Frontend production builds should set:

```text
VITE_CHATBOT_API_URL=https://your-chatbot-app-domain.example
```

The chatbot backend cPanel Python App should use:

```text
Application root: chatbot-deployment-main
Application startup file: passenger_wsgi.py
Application entry point: application
```
