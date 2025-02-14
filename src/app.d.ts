import type { Db, MongoClient } from "mongodb";

declare global {
  namespace App {
    interface Locals {
      sessionId: string | undefined
      client: MongoClient
      db: Db
    }

  }

  interface BlogSnippet {
    _id: ObjectID,
    author: string,
    title: string,
    language?: string | string[],
    description: string,
    body: string,
    date?: string
  }

  export type PageData = {
    blogs: BlogSnippet[];
    userObj: any;
  };

}

export { };
