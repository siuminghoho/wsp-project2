import { Router, Request, Response } from "express";
import { User } from "../models/user";
import { pgClient } from "../main";

export const authRoute = Router();

authRoute.post("/login", async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlQuery = `SELECT id, username, password FROM users WHERE username = $1`;

  try {
    const queryResult = await pgClient.query(sqlQuery, [username]);
    const data: User = queryResult.rows[0];
    if (data) {
      if (data.password === password) {
        req.session["userId"] = data.id;
        req.session["username"] = data.username;
        res.status(200).json({ msg: "success login", userId: data.id });
      } else {
        res.redirect(400, "/");
      }
    } else {
      res.redirect(400, "/");
    }
  } catch (e) {
    res.status(500).json({ msg: "internal server error" });
  }
});