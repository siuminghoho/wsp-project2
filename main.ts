// WSP009
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export const client = new Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

client.connect();
////////////


import express from "express";
import { Request, Response, NextFunction } from "express";
// expressSession is a middleware package that we will use to manage our sessions
import expressSession from "express-session";
import fs from 'fs';
import path from "path";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sample user data (for demonstration purposes)
// const users = [
//   { username: 'admin', password: 'admin' },
//   { username: 'user', password: 'user' },
// ];




app.use(
  expressSession({
    secret: "demo demo demo",
    resave: true,
    saveUninitialized: true,
  })
);

declare module "express-session" {
  interface SessionData {
    name?: string;
  }
}

app.get("/index", function (req: Request, res: Response) {
  res.end("Hello World2");
});



app.get("/", function (req: Request, res: Response) {
  res.end("Hello World");
});



export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware: This will be logged before handling the request.");
  next(); // Call next() to pass control to the next middleware in the chain
};




app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);

});

function readUserJSON(): Promise<any> {
  return new Promise((resolve, reject) => {
    const filePath =path.join(__dirname,'private','user.json')
    fs.readFile(filePath,'utf-8',(err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const users = JSON.parse(data);
          resolve(users);
        }
        catch (parseError) {
          reject(parseError);

        }
      }
    })
  });
}

async function main(){
  try{
    const users = await readUserJSON();
    console.log(users)
  }catch(e){
    console.log('Error reading JSON file', e);
  }
}

main();





//404 not found



app.use((req, res) => {
  res.sendFile(path.resolve("./public/404.html"));
});


