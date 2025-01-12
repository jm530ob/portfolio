import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { initializeDb } from "../middleware/Database.middleware";

export const route = express.Router();

let sessions: Map<string, string> = new Map();

route.get("/", (req, res) => {

  res.status(400).send("Access denied!");
});

route.use(initializeDb);

route.post("/register", [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username must not be empty!")
    .isLength({ min: 3 })
    .withMessage("Username must be atleast 3 characters long!"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 5 })
    .withMessage("Password must contain atleast 5 characters")
],
  async (req: Request, res: Response) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(502).json(errors.array());
      return;
    }

    let { username, password }: { username: string, password: string } = req.body;
    if (username == null || password == null) {
      res.status(500).json({ msg: "Invalid request!" });
      return;
    }

    try {
      let collection = req.db.collection("users");
      let userExists = await collection.findOne({ username });
      if (userExists == null) {
        let doc = {
          username,
          password,
          sessionId: crypto.randomUUID,
          creationDate: new Date().toLocaleString()
        }
        await collection.insertOne(doc);

        res.status(200).json({ msg: "success" });
      }
      else {
        res.status(500).json({ msg: `User with name "${username}" already exists!` });
        return;
      }
    }
    catch (e) { }
  });

// todo
route.post("/login", async (req, res) => { });
