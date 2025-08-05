import cosineSimilarity from "compute-cosine-similarity";

type Chunk = {
  text: string;
  embedding: number[];
};

const chunks: Chunk[] = [];

export function addToStore(text: string, embedding: number[]) {
  chunks.push({ text, embedding });
}

export function queryRelevantChunks(queryEmbedding: number[], topK = 3): string[] {
  const scored = chunks.map(chunk => ({
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));

  return scored
    .sort((a, b) => b.score! - a.score!) // higher = more similar
    .slice(0, topK)
    .map(chunk => chunk.text);
}
