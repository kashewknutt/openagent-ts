import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME = "llama3-70b-8192";

export async function callLLM(
  key: string,
  memory: { role: string; content: string }[],
  contextChunks: string[] = []
) {
  const context = contextChunks.length
    ? `You may use the following context to help you answer:\n\n${contextChunks.map((c, i) => `(${i + 1}) ${c}`).join("\n\n")}`
    : "No additional context provided.";

  const systemPrompt = `
You are an AI assistant. Respond concisely and helpfully.

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

    const reply =
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "No reply from model.";

    console.log("Groq response:", reply.slice(0, 200));
    return reply;
  } catch (err) {
    console.error("Groq Error:", err);
    return "Could not get a response from the LLM.";
  }
}
