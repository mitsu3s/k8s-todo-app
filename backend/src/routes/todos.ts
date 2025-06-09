import express from "express";
import { pool } from "../db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";

const router = express.Router();

router.get("/", async (_req, res) => {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM todos ORDER BY id DESC"
  );
  res.json(rows);
});

router.post("/", async (req, res) => {
  const { text } = req.body;

  // INSERT文（? プレースホルダ）
  const [result] = await pool.query<ResultSetHeader>(
    "INSERT INTO todos (text) VALUES (?)",
    [text]
  );

  // insertId から再取得（任意）
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM todos WHERE id = ?",
    [result.insertId]
  );

  res.json(rows[0]);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM todos WHERE id = ?", [id]);
  res.sendStatus(204);
});

export default router;
