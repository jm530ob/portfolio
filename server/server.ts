import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DialogModel } from "./db/models/dialog";

dotenv.config({ path: "../.env" });

try {
  let conn = mongoose.connect(`${process.env.MONGO_CONN}`);
} catch (err) {
  console.error(err);
}

const port = 3000;

const app = express();

// todo: query db data as an accessible resource thorugh /api interface
app.get("/api", async (req, res) => {
  try {
    const data = await DialogModel.find();
    res.json(data);
  } catch (err) {
    console.error(err);
  }

});

// todo: handle POST request, store data into database

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
