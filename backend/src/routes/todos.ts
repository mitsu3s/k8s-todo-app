import express from "express";
import { pool } from "../db/db";
import { RowDataPacket } from "mysql2";

const router = express.Router();

router.get("/", async (_req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM todos ORDER BY id DESC"
  );
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { text } = req.body;
  const [rows] = await pool.query<RowDataPacket[]>(
    "INSERT INTO todos (text) VALUES ($1) RETURNING *",
    [text]
  );
  res.json(rows[0]);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM todos WHERE id = $1", [id]);
  res.sendStatus(204);
});

export default router;
