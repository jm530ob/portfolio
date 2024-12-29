import { MongoClient, Db, Document, Collection } from "mongodb"
import { MONGO_URI } from "../config"

const client = new MongoClient(MONGO_URI);

export async function connect(): Promise<MongoClient> {
  let conn = client.connect();
  return conn;
}

export function createDb(client: MongoClient, name: string): Db {
  let db = client.db(name);
  return db;
}

export function createCollection<T extends Document>(db: Db, name: string): Collection<T> {
  return db.collection<T>(name);
}
