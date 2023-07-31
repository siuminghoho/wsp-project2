import express from "express";

declare module "express-session" {
  interface SessionData {
    counter: number;
    user?: string;
  }
}

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session?.user) {
    //called Next here
    next();
  } else {
    // redirect to index page
    res.redirect("/")
  }
};
