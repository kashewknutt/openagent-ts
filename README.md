# OpenAgent-TS

This is an AI Agent backend system built in **TypeScript (Node.js)**, featuring:

- Chat interface with memory
- Retrieval-Augmented Generation (RAG)
- Plugin system (Math + Weather)
- Hosted on Google Cloud Run

---

## Features

- `POST /agent/message` — Send a message to the agent with a `session_id`.
- Persistent memory for each session.
- Retrieves top 3 relevant context chunks from a local vector store (markdown/text files).
- Supports plugin execution for:
    - Math expressions (`2 + 5 * 3`)
    - Weather search (`weather in Mumbai`)
- Uses Groq’s `LLaMA 3 70B` for inference.

---

## Setup Locally

```bash
git clone https://github.com/kashewknutt/openagent-ts.git
cd openagent-ts/backend # Create your .env here in this backend folder.

# Install dependencies
npm install

# Run development server
npm run dev
```

### Deployment

Hosted on Google Cloud Run  
Live URL:  
`https://openagent-ts-backend-<your-region>.a.run.app/agent/message`

### Test via cURL

```bash
curl -X POST https://<your-deployed-url>/agent/message \
    -H "Content-Type: application/json" \
    -d '{
        "session_id": "test123",
        "message": "What is 12 * 8 + 1?"
}'
```

### Project Structure

```plaintext
backend/
├── src/
│   ├── agent/             # Core agent logic
│   ├── plugins/           # Plugin system (math + weather)
│   ├── rag/               # Embedding + vector search logic
│   ├── store/             # In-memory session store
│   └── index.ts           # Express entry point
├── .env
├── package.json
└── README.md
```

### RAG Details

- Local markdown/text files stored in `/data/`
- Chunked and embedded on startup
- Vector search uses cosine similarity
- Top 3 matches are injected into prompt

### Plugin System

#### Math Plugin

Evaluates basic math expressions.

#### Weather Plugin

Mocks or fetches current weather using a sample API.

### Environment Variables

```ini
GROQ_API_KEY=<your-groq-key>
```