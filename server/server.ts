import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/api";
import { PORT } from "./config";
import { connect, createDb, createCollection } from "./db/dbConnection";
import { Blog } from "./db/types";

dotenv.config({ path: "../.env" });

(async () => {
  let conn = await connect();
  let db = createDb(conn, "mongo-db");
  let blogs = createCollection<Blog>(db, "blogs");
  try {
  } catch (err) {
    console.error("Connecting to database failed with error, " + err);
  }


  const app = express();
  app.use(express.json());
  app.use(router);


  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
  });
})();

