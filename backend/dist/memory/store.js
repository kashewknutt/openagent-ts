"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeMessage = storeMessage;
exports.getSessionHistory = getSessionHistory;
const sessions = new Map();
function storeMessage(sessionId, message) {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, []);
    }
    sessions.get(sessionId).push(message);
}
function getSessionHistory(sessionId) {
    return sessions.get(sessionId) || [];
}
