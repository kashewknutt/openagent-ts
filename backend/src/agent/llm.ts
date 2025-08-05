// backend/src/agent/llm.ts

import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME = "llama3-70b-8192";

export type LLMResult =
  | { type: "plugin"; plugin: string; input: string }
  | { type: "text"; content: string }
  | { type: "error"; content: string };

export async function callLLM(
  key: string,
  memory: { role: string; content: string }[],
  contextChunks: { content: string; source: string }[] = []
): Promise<LLMResult> {

  const context = contextChunks.length
  ? `You may use the following context to help you answer:\n\n${contextChunks.map((c, i) => `(${i + 1}) [${c.source}]: ${c.content}`).join("\n\n")}`
  : "No additional context provided.";

  const systemPrompt = `
You are an AI assistant. Respond concisely and helpfully.

If the user's query is a math expression (like "calculate 3*4+2") or a weather question (like "what's the weather in Tokyo?"), respond strictly in the following JSON format:

{
  "plugin": "math", // or "weather"
  "input": "user input string or parsed location"
}

Otherwise, give a helpful natural language answer based on the context below.

${context}
`.trim();

  const messages = [
    { role: "system", content: systemPrompt },
    ...memory
  ];

  try {
    console.log("Calling Groq with LLaMA 3 model...");

    const response = await axios.post(
      GROQ_URL,
      {
        model: MODEL_NAME,
        messages
      },
      {
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    const raw = response.data?.choices?.[0]?.message?.content?.trim() || "";
    console.log("Groq response:", raw.slice(0, 200));

    // Try to parse JSON if it looks like a plugin call
    if (raw.startsWith("{")) {
      try {
        const parsed = JSON.parse(raw);
        if (
          parsed.plugin &&
          typeof parsed.plugin === "string" &&
          typeof parsed.input === "string"
        ) {
          return { type: "plugin", plugin: parsed.plugin, input: parsed.input };
        }
      } catch (err) {
        // fallback to text
      }
    }

    return { type: "text", content: raw };
  } catch (err) {
    console.error("Groq Error:", err);
    return { type: "error", content: "Could not get a response from the LLM." };
  }
}
