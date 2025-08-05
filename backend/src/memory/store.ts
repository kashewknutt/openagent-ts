type Message = { role: "user" | "assistant", content: string };

const sessions = new Map<string, Message[]>();

export function storeMessage(sessionId: string, message: Message) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, []);
  }
  sessions.get(sessionId)!.push(message);
}

export function getSessionHistory(sessionId: string): Message[] {
  return sessions.get(sessionId) || [];
}
