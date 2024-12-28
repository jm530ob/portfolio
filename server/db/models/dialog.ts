import mongoose from "mongoose";

const DialogSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  description: { type: String, required: false },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now() }
});


export const DialogModel = mongoose.model("Dialog", DialogSchema);

