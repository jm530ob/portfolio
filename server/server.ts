import express from "express";
import { router } from "./routes/api";
import config from "./config";

const app = express();
app.use(express.json());
app.use(router);

app.listen(config.port, () => {
  console.log(`Listening on port: ${config.port}`)
});

