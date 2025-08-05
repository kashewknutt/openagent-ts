import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL_NAME = "llama3-8b-8192";

export async function callLLM(
  key: string,
  memory: { role: string; content: string }[]
) {
  try {
    console.log("Calling Groq with LLaMA 3 model...");

    const response = await axios.post(
      GROQ_URL,
      {
        model: MODEL_NAME,
        messages: memory
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
  } catch (err: any) {
    console.error("Groq Error:", err.response?.data || err.message);
    return "Could not get a response from the LLM.";
  }
}
