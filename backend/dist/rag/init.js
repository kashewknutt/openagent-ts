"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAndEmbedDocs = loadAndEmbedDocs;
// backend/src/rag/init.ts
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const chunk_1 = require("./chunk");
const embed_1 = require("./embed");
const vectorStore_1 = require("./vectorStore");
async function loadAndEmbedDocs(apiKey) {
    const dir = path_1.default.join(__dirname, "..", "..", "data");
    const files = fs_1.default.readdirSync(dir).filter(f => f.endsWith(".md"));
    for (const file of files) {
        const filePath = path_1.default.join(dir, file);
        const content = fs_1.default.readFileSync(filePath, "utf-8");
        const chunks = (0, chunk_1.chunkText)(content);
        for (const chunk of chunks) {
            const embedding = await (0, embed_1.getEmbedding)(chunk);
            if (embedding.length) {
                (0, vectorStore_1.addToStore)(chunk, embedding, file);
            }
        }
    }
    console.log("Docs loaded and embedded.");
}
