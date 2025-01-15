import { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import { connect } from "../database/Mongo.database";
import config from "../config";

let client: MongoClient | null = null;

export async function initializeDb(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {

    req.client = client = await connect();
    req.db = req.client.db(config.database);
  } catch (e) {
    res.status(500).json({ msg: "Error connecting to a database!" });
    return;
  }

  if (client == null) {
    res.status(500).json({ msg: "Waiting for database connection!" });
    return;
  }
  next();
}
