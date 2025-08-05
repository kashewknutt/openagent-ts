import { Request, Response } from "express";
import { callLLM }from "./llm";
import { storeMessage, getSessionHistory } from "../memory/store";
import { getEmbedding } from "../rag/embed";
import { queryRelevantChunks } from "../rag/vectorStore";

export async function handleMessage(req: Request, res: Response) {
  const { key, message, session_id } = req.body;
  if (!message || !session_id || !key) {
    return res.status(400).json({ error: "Missing message, session_id or key" });
  }

  storeMessage(session_id, { role: "user", content: message });

  const history = getSessionHistory(session_id).slice(-2); // last 2 messages

  const queryEmbedding = await getEmbedding(message);
  const contextChunks = queryRelevantChunks(queryEmbedding, 3);

  const reply = await callLLM(key, [...history, { role: "user", content: message }], contextChunks);

  storeMessage(session_id, { role: "assistant", content: reply });

  return res.json({ reply, session_id });
}
