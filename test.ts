import express from "express";
import { Request, Response, NextFunction } from "express";
import expressSession from "express-session";
import path from "path";

const app = express();

app.get("/", function (req: Request, res: Response) {
  const name = req.query.name;
  const location = req.query.location;
  res.end(`Name is ${name}, Location is ${location}`);
  console.log("GET REQUEST")
});

app.get("/name/:name/loc/:location", (req, res) => {
  const name = req.params.name;
  const location = req.params.location;
  res.end(`Name is ${name}, Location is ${location}`);
  console.log("GET REQUEST 2")
});





app.use((req: Request, res: Response, next: NextFunction) => {
  //console.log(`[${new Date().toISOstring()}]:${req.path}`)
  console.log(`${new Date().toISOString()}:${req.path}`)
  next();
});

app.get("/text", (__req, res) => {
  res.sendFile(path.resolve("public", "sample.txt"));
});




//wont get there because static public on the 9th line, default to index.html in public folder
app.get("/", (req: Request, res: Response) => {
  console.log("INDEX PAGE")
  res.send("GOOD")
})



app.use("/images", express.static("uploads"));

app.use(
  expressSession({
    secret: "Chainsaw mannnnnn",
    resave: true,
    saveUninitialized: true,
  }));

declare module "express-session" {
  interface SessionData {
    name?: string;
  }
}
app.use(express.static("public"));


const PORT = 8070;

app.listen(PORT, () => {

  console.log(`Listening at http://localhost:${PORT}/`)
})





app.use((req, res) => {
  res.sendFile(path.resolve("./public/404.html"));
  console.log("404 not founddddddd")
});