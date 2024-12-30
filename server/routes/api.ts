import express, { Request, Response, NextFunction } from "express";
import { Collection, Db, MongoClient } from "mongodb";
import { connect, getCollection } from "../db/dbConnection";
import { Blog } from "../db/types";
import config from "../config";


export const router = express.Router();


let client: MongoClient | null = null;


async function initializeDb(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    req.client = client = await connect();
    req.db = req.client?.db(config.database);
    req.collection = req.db?.collection(config.collection);
  } catch (e) {
    res.status(500).json({ success: false, msg: "Error connecting to a database!" });
    return;
  }

  if (client == null) {
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

router.get("/", (req, res) => {
  //todo
});

router.get("/api", async (req, res) => {
  try {
    let data = await req.collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ success: false, msg: "Error accessing a database!" });
  }
});

router.get("/api/:id", async (req, res) => {
  let id;
  id = req.params.id;
});

router.post("/api", validateData, async (req, res) => {
  let data = req.body;
  const doc: Blog = {
    author: data.author,
    title: data.title,
    body: data.body,
    description: data.description,
    date: new Date().toLocaleString()
  }
  req.collection.insertOne(data);
})

