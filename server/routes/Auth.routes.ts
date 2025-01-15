import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { check, validationResult } from "express-validator";
import { initializeDb } from "../middleware/Database.middleware";
import { warn } from "console";

export const route = express.Router();

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
      res.status(502).json(errors.array()[0]);
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
          role: "User",
          sessionId: crypto.randomUUID(),
          creationDate: new Date().toLocaleString()
        }
        await collection.insertOne(doc);

        res.status(200).json({ msg: "success" });
      }
      else {
        res.status(500).json({ msg: `User with name ${username} already exists!` });
        return;
      }
    }
    catch (e) {

    }
  });

route.post("/login", async (req, res) => {
  let { username, password }: { username: string, password: string } = req.body;

  if (username == null || password == null) {
    res.status(500).json({ msg: "Invalid request!" });
    return;
  }
  try {
    let collection = req.db.collection("users")
    let query = { username, password };
    let options = {
      projection: { sessionId: 1 }
    }

    let match = await collection.findOne(query, options);
    if (match == null) {
      res.status(401).json({ msg: `User ${username} is not registered or data is incorrect!` });
      return;
    }
    let role = match.role;

    let sessionId = match.sessionId;
    let expires = new Date(Date.now() + 60 * 60 * 1000);
    res.status(200).cookie("sessionId", sessionId, { httpOnly: true, expires });
    res.json({ msg: "User authenticated!", username, role });
    return;
  }
  catch (e) {

  }
});


route.post("/user", cookieParser(), async (req, res) => {
  let sessionId = req.cookies.sessionId;

  let options = {
    projection: {
      _id: 0, sessionId: 1, username: 1, role: 1
    }
  }
  let response = await req.db.collection("users").findOne({ sessionId }, options);

  if (response == null) {
    res.status(500).json({ msg: "User is not logged in!" });
    return;
  }

  let user = response.username;
  let role = response.role;

  res.status(200).json({ msg: "Successfully authenticated!", user, role });
})
