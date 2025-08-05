// lib/session.ts
import { v4 as uuidv4 } from 'uuid';

export function getSessionId(): string {
  if (typeof window === 'undefined') return ''; // SSR safety

  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}
