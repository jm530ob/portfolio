// import { database } from "$env/static/private";
import { json, type Handle, type RequestEvent } from "@sveltejs/kit";
import { connect } from "./mongo.client";

const database = "db0";

async function initializeDb(event: RequestEvent) {
  try {

    event.locals.client = await connect();
    event.locals.db = event.locals.client.db(database);
  } catch (e) {

    return json({ msg: "Error connecting to a database!" }, { status: 500 });
  }

  if (event.locals.client == null) {
    return json({ msg: "Waiting for database connection!" }, { status: 500 });
  }
}

export const handle: Handle = async ({ event, resolve }) => {

  if (event.url.pathname.startsWith("/auth")) {
    await initializeDb(event);
  }

  if (event.url.pathname.startsWith("/res")) {
    await initializeDb(event);

    if (event.request.method == "POST") {
      let sessionId = event.locals.sessionId = event.cookies.get("sessionId");

      if (event.locals.sessionId == undefined) {
        return json({ msg: "User is not logged in!" }, { status: 401 });
      }

      let options = { projection: { _id: 0, role: 1 } };
      let user = await event.locals.db.collection("users").findOne({ sessionId }, options);

      if (user == null) {
        return json({ msg: "User does not exists!" }, { status: 500 });
      }

      let role = user.role;

      if (role != "Admin") {
        return json({ msg: "User does not have admin permissions" }, { status: 401 });
      }
    }
  }

  const response = await resolve(event);

  return response;

}
