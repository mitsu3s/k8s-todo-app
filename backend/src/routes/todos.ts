import express from "express";
import { pool } from "../db/db";

const router = express.Router();

router.get("/", async (_req, res) => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id DESC");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const result = await pool.query(
    "INSERT INTO todos (text) VALUES ($1) RETURNING *",
    [text]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.sendStatus(204);
});

export default router;
