import { NextFunction, Request, Response } from "express";
import { Session, User } from "../models";

async function auth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.cookies || !req.cookies["_session"]) {
    console.log(req.cookies);
    console.log("session token not present");
    next();
    return;
  }

  // validate session
  const session = await Session.findOne({
    where: {
      token: req.cookies["_session"],
    },
  });

  if (!session) {
    console.log("session does not exist");
    res.clearCookie("_session");
    res.redirect("/sessionexpired");
    return;
  }

  if (session && session.hasExpired()) {
    res.clearCookie("_session");
    res.redirect("/sessionexpired");
    return;
  }

  const user = await User.findOne({
    where: {
      id: session.dataValues.UserId,
    },
    attributes: {
      exclude: ["password"],
    },
  });

  res.locals.signedIn = true;
  res.locals.sessionId = req.cookies["_session"];
  res.locals.user = user?.dataValues;

  next();
}

export default auth;
