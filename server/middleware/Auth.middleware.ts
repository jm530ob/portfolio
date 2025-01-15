import { Request, Response, NextFunction } from "express";

export function authorize(checkAdmin = false) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let sessionId = req.cookies.sessionId;

    if (sessionId == null) {
      res.status(500).json({ msg: "User is not logged in!" });
      return;
    }

    let options = { projection: { _id: 0, role: 1 } };
    let user = await req.db.collection("users").findOne({ sessionId }, options);

    if (user == null) {
      res.status(500).json({ msg: "User does not exists!" });
      return;
    }

    if (checkAdmin) {
      let role = user.role;

      if (role != "Admin") {
        res.status(401).json({ msg: "User does not have admin permissions" });
        return;
      }
    }

    next();
  }
}
