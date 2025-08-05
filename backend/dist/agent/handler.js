"use strict";
// backend/src/agent/handler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = handleMessage;
const llm_1 = require("./llm");
const store_1 = require("../memory/store");
const embed_1 = require("../rag/embed");
const vectorStore_1 = require("../rag/vectorStore");
const math_1 = require("../plugins/math");
const weather_1 = require("../plugins/weather");
function normalizeLLMReply(result) {
    if (typeof result === "string")
        return result;
    return `{"plugin":"${result.plugin}","input":"${result.input}"}`;
}
async function handleMessage(req, res) {
    const { key, message, session_id } = req.body;
    if (!message || !session_id || !key) {
        return res.status(400).json({ error: "Missing message, session_id or key" });
    }
    (0, store_1.storeMessage)(session_id, { role: "user", content: message });
    const history = (0, store_1.getSessionHistory)(session_id).slice(-2);
    const queryEmbedding = await (0, embed_1.getEmbedding)(message);
    const contextChunks = (0, vectorStore_1.queryRelevantChunks)(queryEmbedding, 3);
    const result = await (0, llm_1.callLLM)(key, history, contextChunks.map(c => ({ content: c.text, source: c.source })));
    if (result.type === "plugin") {
        let pluginReply = "";
        if (result.plugin === "math") {
            pluginReply = (0, math_1.handleMath)(result.input);
        }
        else if (result.plugin === "weather") {
            pluginReply = await (0, weather_1.handleWeather)(result.input);
        }
        else {
            pluginReply = "Unknown plugin requested.";
        }
        (0, store_1.storeMessage)(session_id, { role: "assistant", content: pluginReply });
        return res.json({ reply: pluginReply, session_id });
    }
    (0, store_1.storeMessage)(session_id, { role: "assistant", content: result.content });
    return res.json({
        reply: result.content,
        session_id,
        sources: contextChunks.map((c, i) => ({
            index: i + 1,
            source: c.source
        }))
    });
}
