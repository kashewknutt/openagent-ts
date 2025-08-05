"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmbedding = getEmbedding;
// backend/src/rag/embed.ts
const transformers_1 = require("@xenova/transformers");
// Load once at top-level
let extractor;
async function getEmbedding(text) {
    if (!extractor) {
        console.log("Loading embedding model...");
        extractor = await (0, transformers_1.pipeline)("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }
    const output = await extractor(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
}
