import express from "express";
import { resourceRoute } from "./routes/Resources.routes";
import { route as authRoute } from "./routes/Auth.routes";
import config from "./config";

const app = express();
app.use(express.json());
app.use("/res", resourceRoute);
app.use("/auth", authRoute);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});

