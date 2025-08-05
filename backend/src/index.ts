// backend/src/index.ts

import express from "express";
import { handleMessage } from "./agent/handler";
import { loadAndEmbedDocs } from "./rag/init";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const PORT =  8080;

app.use(express.json());

app.post("/agent/message", handleMessage);

// Function to be called on startup
function onStartup() {
  loadAndEmbedDocs(process.env.GROQ_API_KEY || "")
  console.log("Application has started successfully!");
}

onStartup(); // Call the function on startup

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening at http://0.0.0.0:${PORT}`);
});
