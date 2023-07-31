import { Router, Request, Response } from "express";

export const userRoute = Router();

userRoute.get("/", (req: Request, res: Response) => {
  if (req.session["user"]) {
    res.json({ username: req.session["user"] });
  } else {
    res.status(403).json({ msg: "you are not logged in" });
  }
});
