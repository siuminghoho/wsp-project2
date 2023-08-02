import express from "express";
import { Request, Response } from "express";
import path from "path";
import expressSession from "express-session";
import { isLoggedIn } from "./utils/guard";
import { router } from "./router";
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

declare module "express-session" {
  interface SessionData {
    counter: number;
    userId?: number;
    username?: string;
  }
}

//for DBconnection process
export const pgClient = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
pgClient.connect();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: "any secret, something, anything",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(router);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));

app.use(isLoggedIn, express.static(path.join(__dirname, "protected")));

app.use((req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening to http://localhost:${PORT}`);
});



