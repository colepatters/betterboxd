import express from "express";
import "dotenv/config";

import routes from "./routes";
import sequelize from "./db/connection";

import { engine } from "express-handlebars";

const db = sequelize;
sequelize.sync({ force: true });

const app = express();

// use handlebars as templating engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use("/public", express.static("public"));

app.use("/", routes);

const port = process.env.PORT ?? 5242;
app.listen(port, () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
