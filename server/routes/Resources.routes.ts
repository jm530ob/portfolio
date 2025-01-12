import express, { Request, Response, NextFunction } from "express";
import { initializeDb } from "../middleware/Database.middleware";
import { Blog } from "../database/types";

export const resourceRoute = express.Router();

function validateData(req: Request, res: Response, next: NextFunction): void {
  let data = req.body; // not the best solution, may try using joi
  if (!data?.author || !data?.title || !data?.body || !data?.description) {
    res.status(400).json({ success: false, msg: "All required fields must be defined!" });
    return;
  };
  next();
}

resourceRoute.use(initializeDb);


resourceRoute.get("/", async (req, res) => {
  try {
    let data = await req.collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ success: false, msg: "Error accessing a database!" });
  }
});

resourceRoute.get("/:id", async (req, res) => {
  let id;
  id = req.params.id;
});

resourceRoute.post("/", validateData, async (req, res) => {
  let data = req.body;
  const doc: Blog = {
    author: data.author,
    title: data.title,
    body: data.body,
    description: data.description,
    date: data.date
  }
  req.collection.insertOne(data);
})

