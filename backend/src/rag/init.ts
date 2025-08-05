// backend/src/rag/init.ts
import fs from "fs";
import path from "path";
import { chunkText } from "./chunk";
import { getEmbedding } from "./embed";
import { addToStore } from "./vectorStore";

export async function loadAndEmbedDocs(apiKey: string) {
  const dir = path.join(__dirname, "..", "..", "data");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".md"));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const chunks = chunkText(content);

    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      if (embedding.length) {
        addToStore(chunk, embedding, file);
      }
    }
  }


  console.log("Docs loaded and embedded.");
}
