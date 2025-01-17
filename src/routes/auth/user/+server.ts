import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, cookies }) => {

  let sessionId = cookies.get("sessionId");

  let options = {
    projection: {
      _id: 0, sessionId: 1, username: 1, role: 1
    }
  }
  let response = await locals.db.collection("users").findOne({ sessionId }, options);

  if (response == null) {
    return json({ msg: "User is not logged in!" }, { status: 500 });
  }

  let user = response.username;
  let role = response.role;

  return json({ msg: "Successfully authenticated!", user, role }, { status: 200 });
}

