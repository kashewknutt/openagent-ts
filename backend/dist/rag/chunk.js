"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chunkText = chunkText;
// backend/src/rag/chunk.ts
function chunkText(text, maxWords = 200) {
    const words = text.split(/\s+/);
    const chunks = [];
    for (let i = 0; i < words.length; i += maxWords) {
        const chunk = words.slice(i, i + maxWords).join(" ");
        chunks.push(chunk);
    }
    return chunks;
}
