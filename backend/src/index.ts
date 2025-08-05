import express from "express";
import { handleMessage } from "./agent/handler";
import { loadAndEmbedDocs } from "./rag/init";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/agent/message", handleMessage);

// Function to be called on startup
function onStartup() {
  loadAndEmbedDocs(process.env.GROQ_API_KEY || "")
  console.log("Application has started successfully!");
}

onStartup(); // Call the function on startup

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
