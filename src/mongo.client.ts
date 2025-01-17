import { mongo_uri } from "$env/static/private";

import { MongoClient } from "mongodb";

const client = new MongoClient(mongo_uri);

export async function connect(): Promise<MongoClient> {
  return client.connect();
}
