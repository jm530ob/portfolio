import { Collection, Db, Document, MongoClient } from "mongodb";

// todo: auth

declare global { // merge definitions
  namespace Express {

    interface Request {
      client?: MongoClient,
      db: Db,
      collection: Collection
    }
  }
}

export interface Blog extends Document {
  author: string,
  title: string,
  language?: string,
  description: string,
  body: string,
  date?: string
}

