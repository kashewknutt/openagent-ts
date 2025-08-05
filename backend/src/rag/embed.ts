// backend/rag/embed.ts
import { pipeline } from "@xenova/transformers";

// Load once at top-level
let extractor: any;

export async function getEmbedding(text: string): Promise<number[]> {
  if (!extractor) {
    console.log("Loading embedding model...");
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }

  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}
