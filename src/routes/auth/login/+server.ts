import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals, cookies }) => {
  const requestBody = await request.json();
  let { username, password } = requestBody;

  if (username == null || password == null) {
    return json({ msg: "Invalid request!" }, { status: 500 });
  }

  try {
    let collection = locals.db.collection("users")
    let query = { username, password };
    let options = {
      projection: { sessionId: 1 }
    }

    let match = await collection.findOne(query, options);
    if (match == null) {
      return json({ msg: `User ${username} is not registered or data is incorrect!` }, { status: 401 });

    }
    let role = match.role;

    let sessionId = match.sessionId;
    let expires = new Date(Date.now() + 60 * 60 * 1000);
    cookies.set("sessionId", sessionId, { path: "/", httpOnly: true, expires });

    return json({ msg: "User authenticated!", username, role }, { status: 200 });
  }
  catch (e) {
    return json(e, { status: 500 });
  }

}
