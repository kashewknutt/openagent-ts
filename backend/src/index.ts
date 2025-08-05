import express from "express";
import { handleMessage } from "./agent/handler";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/agent/message", handleMessage);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
