## `NOTES.md`

```md
# Developer Notes

---

## What Was AI-Generated

- Initial vector search logic inspiration
- Suggestions for plugin routing and prompt formatting
- Some troubleshooting (like Vercel and GCP deploy fixes)

---

## What Was Built By Me

- Full backend architecture
- Prompt engineering for combining memory + RAG + plugins
- Vector store built from scratch using `compute-cosine-similarity`
- Plugin execution engine with conditional JSON formatting
- Deployment and port fixes for GCP

---

## Issues Faced & Solutions

### 1. `ml-distance` module issues
- Error: `Module has no exported member 'cosine'`
- Solution: Switched to `compute-cosine-similarity` (simple + typed)

---

### 2. Vercel Build Errors
- Issue with `tsc` not having permissions
- TS Node not found during runtime
- Switched to GCP Cloud Run + set runtime memory/port correctly

---

### 3. Plugin and RAG triggering together
- Sometimes both sources + plugin output were returned
- Fixed by prioritizing plugin output when intent is detected (no context needed in such cases)

---

## Plugin Routing Strategy

1. User message is sent to LLM with instruction:
    - If math or weather-related, return fixed JSON:
      ```json
      {
         "plugin": "weather",
         "input": "Bangalore"
      }
      ```
2. Backend detects this format → triggers relevant plugin
3. Result injected into follow-up LLM message
4. Final user-facing response generated with plugin output

---

## Memory + RAG Injection Flow

1. Retrieve last 2 messages for the `session_id`
2. Embed current message
3. Run cosine similarity with local vector chunks
4. Inject top 3 chunks into the system prompt

---

## Deployment Details

- Deployed on **Google Cloud Run**
- Port configured to `8080`
- Memory: 512 MB, Concurrency: 40
- `.env` used for config
- Start command: `ts-node src/index.ts`

---

## Final Thoughts

The agent performs RAG + plugin execution + memory in a modular, readable, and production-deployable setup. It can now be extended with additional plugins or a frontend UI.
```
