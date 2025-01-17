import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, locals }) => {
  const requestBody = await request.json();
  let { username, password } = requestBody;

  if (username == null || password == null) {
    return json({ msg: "Invalid request!" }, { status: 500 });
  }

  try {
    let collection = locals.db.collection("users");
    let userExists = await collection.findOne({ username });
    if (userExists == null) {
      let doc = {
        username,
        password,
        role: "User",
        sessionId: crypto.randomUUID(),
        creationDate: new Date().toLocaleString()
      }
      await collection.insertOne(doc);

      return json({ msg: "Success!" }, { status: 200 });
    }
    else {
      return json({ msg: `User with name ${username} already exists!` }, { status: 500 });
    }
  }
  catch (e) {
    return json(e, { status: 500 });
  }

}
