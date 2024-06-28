import { Router, urlencoded } from "express";
import express from "express";
import bodyParser from "body-parser";
import { User, Session } from "../../models";
import useragent from "express-useragent";
import bcrypt from "bcrypt";

const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(useragent.express());

router.post("/signin", async (req, res) => {
  if (!req.body) res.status(400).send();

  // remembering session devices
  let clientName = "Unnamed Device";

  if (req.useragent) {
    if (req.useragent.browser) clientName = req.useragent.browser;
    if (req.useragent.os) clientName += " " + req.useragent.os;
  }

  // find user
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    res.redirect("/signin?notFound=true");
    return;
  }

  // compare password hash
  const valid = await bcrypt.compare(
    req.body.password,
    user.dataValues.password
  );

  if (!valid) {
    res.redirect("/signin?badPassword=true");
    return;
  }

  // create session
  const session = await Session.create({
    UserId: user.dataValues.id,
    clientName,
  });

  session.createCookie(res);

  if (!req.body) res.status(400).send();

  res.redirect("/");
});

router.post("/register", async (req, res) => {
  if (!req.body) res.status(400).send();

  let user: User | undefined;
  try {
    user = await User.create(req.body);
  } catch (err: any) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(400).send("User with that email already exists");
    } else {
      res.status(400).send(`An unknown error occured: ${err.name}`);
    }

    return;
  }

  // remembering session devices
  let clientName = "Unnamed Device";

  if (req.useragent) {
    if (req.useragent.browser) clientName = req.useragent.browser;
    if (req.useragent.os) clientName += " " + req.useragent.os;
  }

  const session = await Session.create({
    UserId: user.dataValues.id,
    clientName,
  });

  session.createCookie(res);

  res.redirect("/profile");
});

export default router;
