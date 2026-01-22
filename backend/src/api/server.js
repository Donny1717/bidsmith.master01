// =====================================
// FILE: backend/src/api/server.js
// =====================================

import express from "express";
import cors from "cors";
import { deleteProposal } from "./proposals.js";

// ❗ จุดสำคัญที่สุด (คุณขาดบรรทัดนี้)
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// root
app.get("/", (req, res) => {
  res.send("Bidsmith API running");
});

// health check
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// delete proposal (mock)
app.delete("/api/proposals/:id", (req, res) => {
  const { id } = req.params;
  deleteProposal(id);
  res.json({ success: true, id });
});

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
