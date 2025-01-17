import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, locals }) => {
  try {
    let collection = locals.db.collection("blogs");
    let data = await collection.find({}).toArray();

    return json({ data }, { status: 200 });
  } catch (err) {
    return json({ msg: "Error accessing a database!" }, { status: 400 });
  }
}

export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json();
  let { author, title, body, description } = requestBody;
  const doc = {
    author,
    title,
    body,
    description,
    date: new Date().toLocaleDateString()
  }
  locals.db.collection("blogs").insertOne(doc);

  return json({ msg: "Blog submitted!" }, { status: 200 });
};
