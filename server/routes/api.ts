import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { connect, createDb, createCollection } from "../db/dbConnection";
import { Blog } from "../db/types";

export const router = express.Router();


let client: MongoClient | null = null;

async function initializeDb(req: Request, res: Response, next: NextFunction): Promise<void> {
  client = await connect();
  if (!client) {
    res.status(500).json({ success: false, msg: "Waiting for database connection!" });
    return;
  }
  next();
}

function validateData(req: Request, res: Response, next: NextFunction): void {
  let data = req.body; // not the best solution, may try using joi
  if (!data?.author || !data?.title || !data?.body || !data?.description) {
    res.status(400).json({ success: false, msg: "All required fields must be defined!" });
    return;
  };
  next();

}

router.use(initializeDb);

router.get("/api", async (req, res) => {
  try {
    if (client) {
      let db = createDb(client, "mongo");
      let blogs = createCollection(db, "blogs");
      let result = await blogs.find().toArray();
      res.json(result);
    }
  } catch (err) {
    console.error(err);
  }
});

router.get("/api/:id", async (req, res) => {
  let id;
  id = req.params.id;
});

router.post("/api", validateData, async (req, res) => {
  console.log("Forum submitted!");
  let data = req.body;
  const doc = {
    author: data.author,
    title: data.title,
    body: data.body,
    description: data.description,
    date: Date.now()
  }
  if (client) {
    let db = createDb(client, "mongo");
    let blogs = createCollection(db, "blogs");
    await blogs.insertOne(doc);
  }
})

