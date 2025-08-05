import { Request, Response } from "express";
import { callLLM } from "./llm";
import { storeMessage, getSessionHistory } from "../memory/store";

export async function handleMessage(req: Request, res: Response) {
  const { key, message, session_id } = req.body;
  if (!message || !session_id) {
    return res.status(400).json({ error: "Missing message or session_id" });
  }

  storeMessage(session_id, { role: "user", content: message });

  // Get recent history (last 6 messages for better context)
  const history = getSessionHistory(session_id).slice(-6);

  const reply = await callLLM(key, history);

  storeMessage(session_id, { role: "assistant", content: reply });

  return res.json({ reply, session_id });
}
