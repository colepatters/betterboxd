import { Router } from "express";
import engine from "../engine";

import apiRouter from "./api";

const router = Router();
router.use("/api", apiRouter);

router.get("/", async (req, res) => {
  const content = await engine.render("main", "index");
  res.send(content);
});

router.get("/signin", async (req, res) => {
  const content = await engine.render("main", "signin");
  res.send(content);
});

export default router;
