"use strict";
// backend/src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handler_1 = require("./agent/handler");
const init_1 = require("./rag/init");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.post("/agent/message", handler_1.handleMessage);
// Function to be called on startup
function onStartup() {
    (0, init_1.loadAndEmbedDocs)(process.env.GROQ_API_KEY || "");
    console.log("Application has started successfully!");
}
onStartup(); // Call the function on startup
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://0.0.0.0:${PORT}`);
});
