import express, { Request, Response } from "express";
import { Fields, Files } from "formidable";
import { Memo } from "../models/memo";
import { form } from "../utils/upload";
import { pgClient } from "../main";

export const memoRoute = express.Router();

memoRoute.get("/", async (req: Request, res: Response) => {
  try {
    const sqlQuery = `SELECT id, content, image FROM memos`;
    const queryResult = await pgClient.query(sqlQuery);
    const memos: Memo[] = queryResult.rows;
    res.json({ msg: "success", data: memos });
  } catch (e) {}
});

memoRoute.post("/", async (req: Request, res: Response) => {
  form.parse(req, async (err, fields: Fields, files: Files) => {
    const content = fields.content;
    try {
      if (files.photo) {
        const file = (files.photo as any as Files).newFilename;
        const sqlQuery = `INSERT INTO memos (content, image) VALUES ($1, $2) RETURNING id`;
        const queryResult = await pgClient.query(sqlQuery, [content, file]);
        const id = queryResult.rows[0].id;
        res.status(200).json({ msg: "added memo", id });
      } else {
        const sqlQuery = `INSERT INTO memos (content, image) VALUES ($1) RETURNING id`;
        const queryResult = await pgClient.query(sqlQuery, [content]);
        const id = queryResult.rows[0].id;
        res.status(200).json({ msg: "added memo", id });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ msg: "internal server error" });
    }
  });
});

memoRoute.put("/:id", async (req: Request, res: Response) => {
  const content = req.body.content;
  const id = req.params.id;
  try {
    const sqlQuery = `UPDATE memos SET content = $1 WHERE id = $2 RETURNING id`;
    const queryResult = await pgClient.query(sqlQuery, [content, id]);
    const memoId = queryResult.rows[0].id;
    res.status(200).json({ msg: "updated memo", memoId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "internal server error" });
  }
});

memoRoute.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const sqlQuery = `DELETE FROM memos WEHRE id = $1 RETURNING id`;
    const queryResult = await pgClient.query(sqlQuery, [id]);
    const memoId = queryResult.rows[0].id;
    res.status(200).json({ msg: "deleted memo", memoId });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "internal server error" });
  }
});

memoRoute.get("/like_memos", async (req: Request, res: Response) => {
  const userId = req.session["userId"];
  try {
    const sqlQuery = `
      SELECT m.id, m.content, m.image
      FROM memos m
      JOIN users_memos um
      ON um.memo_id = m.id
      WHERE um.user_id = $1
    `;
    const queryResult = await pgClient.query(sqlQuery, [userId]);
    const memos = queryResult.rows;
    res.status(200).json({ msg: "success", memos });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "internal server error" });
  }
});

memoRoute.post("/like_memos", async (req: Request, res: Response) => {
  const userId = req.session["userId"];
  const memoId = req.query.id;
  try {
    const sqlQuery = `
      INSERT INTO users_memos
      (user_id, memo_id)
      VALUES
      ($1, $1)
      RETURNING id
    `;
    const queryResult = await pgClient.query(sqlQuery, [userId, memoId]);
    const id = queryResult.rows;
    res.status(200).json({ msg: "success", id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "internal server error" });
  }
});

memoRoute.delete("/like_memos", async (req: Request, res: Response) => {
  const userId = req.session["userId"];
  const memoId = req.query.id;
  try {
    const sqlQuery = `
      DELETE FROM users_memos
      WHERE user_id = $1
      AND memo_id = $2
      RETURNING id
    `;
    const queryResult = await pgClient.query(sqlQuery, [userId, memoId]);
    const id = queryResult.rows;
    res.status(200).json({ msg: "success", id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "internal server error" });
  }
});