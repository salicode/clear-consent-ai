import "dotenv/config";
import express from "express";
import cors from "cors";
import { extractFromPolicy } from "./extract.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

app.post("/api/extract", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string" || !text.trim()) {
    return res.status(400).json({ error: "Missing 'text' in request body." });
  }

  const startedAt = Date.now();
  try {
    const items = await extractFromPolicy(text);
    res.json({
      items,
      responseTimeMs: Date.now() - startedAt,
    });
  } catch (err) {
    console.error("Extraction failed:", err);
    res.status(502).json({ error: "Model call failed.", detail: String(err) });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Extraction server listening on http://localhost:${PORT}`);
});