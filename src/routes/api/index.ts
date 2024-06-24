import { Router, urlencoded } from "express";

const router = Router();

router.post("/signin", urlencoded(), async (req, res) => {
  if (!req.body) res.status(400).send();

  res.redirect("/");
});

export default router;
