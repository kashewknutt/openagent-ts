// backend/src/rag/vectorStore.ts
import cosineSimilarity from "compute-cosine-similarity";

type Chunk = {
  text: string;
  embedding: number[];
  source: string;
};

const chunks: Chunk[] = [];

export function addToStore(text: string, embedding: number[], source: string) {
  chunks.push({ text, embedding, source });
}

export function queryRelevantChunks(queryEmbedding: number[], topK = 3): { text: string; source: string }[] {
  const scored = chunks.map(chunk => ({
    text: chunk.text,
    source: chunk.source,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  return scored
    .sort((a, b) => b.score! - a.score!)
    .slice(0, topK)
    .map(({ text, source }) => ({ text, source }));
}
