import express from "express";
import "dotenv/config";

import routes from "./routes";

const app = express();
app.use("/", routes);
app.use("/public", express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT ?? 5242;
app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
