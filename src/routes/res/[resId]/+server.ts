import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";

export const GET: RequestHandler = async ({ locals, params }) => {
  let id = params.resId;
  try {
    let collection = locals.db.collection("blogs");
    let blog = await collection.findOne({
      _id: new ObjectId(id)
    });

    if (blog == null) {
      return json({ msg: "Incorrect url!" }, { status: 500 });

    }
    return json(blog, { status: 200 });
  }
  catch (e) {

    return json({ msg: "404 Not found!" }, { status: 404 });
  }

}
