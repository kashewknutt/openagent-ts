"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToStore = addToStore;
exports.queryRelevantChunks = queryRelevantChunks;
// backend/src/rag/vectorStore.ts
const compute_cosine_similarity_1 = __importDefault(require("compute-cosine-similarity"));
const chunks = [];
function addToStore(text, embedding, source) {
    chunks.push({ text, embedding, source });
}
function queryRelevantChunks(queryEmbedding, topK = 3) {
    const scored = chunks.map(chunk => ({
        text: chunk.text,
        source: chunk.source,
        score: (0, compute_cosine_similarity_1.default)(queryEmbedding, chunk.embedding)
    }));
    return scored
        .sort((a, b) => b.score - a.score)
        .slice(0, topK)
        .map(({ text, source }) => ({ text, source }));
}
