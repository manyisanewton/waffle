# Chatbot Knowledge Packs

Add website knowledge here as small topic files instead of growing one large JSON file.

Each `*.json` file may contain:

```json
{
  "synonyms": {
    "topic_key": ["related phrase", "another phrase"]
  },
  "entries": [
    {
      "id": "unique-entry-id",
      "title": "Readable Title",
      "category": "about",
      "keywords": ["phrases customers may type"],
      "answer": "Short factual answer the LLM can polish.",
      "links": [{ "label": "Page label", "url": "/page-url" }],
      "quick_replies": ["Request a quote", "Show products"]
    }
  ]
}
```

The backend loads `data/knowledge.json` first, then merges every `*.json` file in this folder.
