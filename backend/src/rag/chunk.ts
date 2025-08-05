// backend/rag/chunk.ts
export function chunkText(text: string, maxWords = 200): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += maxWords) {
    const chunk = words.slice(i, i + maxWords).join(" ");
    chunks.push(chunk);
  }

  return chunks;
}
