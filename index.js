import express from "express";
import cors from "cors";
import { router } from "./routes/index.js";
import config from "./config/config.js";

const { HOST, PORT } = config;

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  next();
});

//render api
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//implementaciones de router
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Servidor to http://${HOST}:${PORT}`);
});
