// backend/src/agent/handler.ts

import { Request, Response } from "express";
import { callLLM }from "./llm";
import { storeMessage, getSessionHistory } from "../memory/store";
import { getEmbedding } from "../rag/embed";
import { queryRelevantChunks } from "../rag/vectorStore";
import { handleMath } from "../plugins/math";
import { handleWeather } from "../plugins/weather";

function normalizeLLMReply(result: string | { plugin: string; input: string }): string {
  if (typeof result === "string") return result;
  return `{"plugin":"${result.plugin}","input":"${result.input}"}`;
}


export async function handleMessage(req: Request, res: Response) {
  const { key, message, session_id } = req.body;
  if (!message || !session_id || !key) {
    return res.status(400).json({ error: "Missing message, session_id or key" });
  }

  storeMessage(session_id, { role: "user", content: message });

  const history = getSessionHistory(session_id).slice(-2);

  const queryEmbedding = await getEmbedding(message);
  const contextChunks = queryRelevantChunks(queryEmbedding, 3);

  const result = await callLLM(
    key,
    history,
    contextChunks.map(c => ({ content: c.text, source: c.source }))
  );


  if (result.type === "plugin") {
    let pluginReply = "";

    if (result.plugin === "math") {
      pluginReply = handleMath(result.input);
    } else if (result.plugin === "weather") {
      pluginReply = await handleWeather(result.input);
    } else {
      pluginReply = "Unknown plugin requested.";
    }

    storeMessage(session_id, { role: "assistant", content: pluginReply });
    return res.json({ reply: pluginReply, session_id });
  }

  storeMessage(session_id, { role: "assistant", content: result.content });
  return res.json({
    reply: result.content,
    session_id,
    sources: contextChunks.map((c, i) => ({
      index: i + 1,
      source: c.source
    }))
  });


}
