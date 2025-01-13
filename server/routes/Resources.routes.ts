import express, { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import cookieParser from "cookie-parser";
import { initializeDb } from "../middleware/Database.middleware";
import { Blog } from "../database/types";
import { authorize } from "../middleware/Auth.middleware";
import { title } from "process";

export const route = express.Router();

route.use(initializeDb);
route.use(cookieParser());

route.get("/", async (req, res) => {
  try {
    let collection = req.db.collection("users");
    let data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ success: false, msg: "Error accessing a database!" });
  }
});

route.get("/:id", async (req, res) => {
  let id;
  id = req.params.id;
});

route.post("/", [
  check("author")
    .notEmpty().withMessage("Author is required!")
    .isLength({ min: 3, max: 30 }).withMessage("Author must be between 3 and 30 letters long!"),

  check(title)
    .notEmpty().withMessage("Title is empty!"),

  check("body")
    .notEmpty().withMessage("Article is empty"),

  check("description")
    .notEmpty().withMessage("Write short description!")
    .isLength({ max: 100 }).withMessage("Max length is 100 characters!"),

  authorize(true) // check if admin
],
  async (req: Request, res: Response) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(500).json(errors.array());
      return;
    }

    let { author, title, body, description } = req.body;
    const doc: Blog = {
      author,
      title,
      body,
      description,
      date: new Date().toLocaleDateString()
    }
    req.collection.insertOne(doc);
  })

