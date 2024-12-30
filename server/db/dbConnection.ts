import { MongoClient, Db, Document, Collection } from "mongodb"
import config from "../config"

const client = new MongoClient(config.mongo_uri);

export async function connect(): Promise<MongoClient> {
  let conn = client.connect();
  return conn;
}

export function getCollection<T extends Document>(db: Db, name: string): Collection<T> {
  return db.collection<T>(name);
}
