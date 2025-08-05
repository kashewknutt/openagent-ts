# OpenAgent-TS — Pluggable AI Agent with RAG, Memory & Plugin System

This is a full-stack open-source AI Agent built with **TypeScript**, powered by **Groq**, featuring contextual memory, retrieval-augmented generation (RAG), and a simple plugin system. Built as part of a 1-day backend internship challenge.

---

## Features

- **API Endpoint:** `/agent/message` — LLM agent with memory and plugin support
- **Session-based Memory:** Remembers prior messages per session
- **RAG (Retrieval-Augmented Generation):** Uses embedded context from markdown/text files
- **Plugin System:**
    - `WeatherPlugin(query)`
    - `MathPlugin(expression)`
- **Custom Prompting:** Includes system instructions, memory, context, and plugin results
- **OpenRouter + Any LLM Backend** (GPT-4, Claude, Mixtral, etc.)

---

## Stack

| Layer         | Tech                       |
|---------------|----------------------------|
| Language      | TypeScript (Node.js)       |
| Backend       | Express                    |
| Embeddings    | Groq (LLaMA-style)        |
| Vector Store  | Custom in-memory + cosine  |
| Deployment    | GCP (Backend), Vercel (Frontend) |
| LLM API       | [Groq](https://groq.com/)  |
| Plugins       | Custom JS-based plugins    |

---

## API: `/agent/message`

```http
POST /agent/message
Content-Type: application/json

{
    "message": "What's the weather in Tokyo today?",
    "session_id": "session-123"
}
```

### Response

```json
{
    "reply": "The weather in Tokyo today is 28°C with light showers.",
    "session_id": "session-123"
}
```

---

## File Structure

```bash
openagent-ts/
├── frontend/        ← (Vercel frontend later)
├── backend/         ← (All backend logic here)
│   ├── src/
│   │   ├── agent/
│   │   ├── plugins/
│   │   ├── memory/
│   │   ├── rag/
│   │   ├── utils/
│   │   └── index.ts
│   ├── data/        ← Markdown files for RAG
│   ├── .env
│   ├── tsconfig.json
│   ├── package.json
│   └── README.md
└── NOTES.md
```

---

## Deployment

### Backend (GCP)

Set up environment variables:

```ini
GROQ_API_KEY=your_key_here
```

### Frontend (Vercel)

Coming soon: Simple UI on Vercel (optional).

---

## Setup Instructions

```bash
git clone https://github.com/kashewknutt/openagent-ts
cd openagent-ts
npm install  # or pnpm install
```

### Run Locally

```bash
npm dev
```

### Environment Variables (.env)

```env
GROQ_API_KEY=sk-...
```

---

## Notes

- Uses Groq for LLM calls (supports GPT-4, Claude, Mixtral, etc.).
- All plugin triggers are interpreted from plain text intents (not OpenAI tools).
- You can expand the `data/` folder with your own `.md` or `.txt` files for more RAG power.
- Cosine similarity is computed manually — no external vector DB needed.

---

## TODO (Post Challenge)

- Add UI client.
- Add more plugins (Search, News, Translate, etc.).
- Memory persistence (Redis or DB).
- Add streaming support.

---

## License

MIT — Open source forever.

---

## Author

Built with focus, coffee, and good vibes by [Your Name].