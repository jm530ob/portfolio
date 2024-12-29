import { Document } from "mongodb";

// todo: auth

export interface Blog extends Document {
  author: string,
  title: string,
  language?: string,
  description: string,
  body: string,
  date?: Date
}
