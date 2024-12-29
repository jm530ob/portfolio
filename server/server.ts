import express from "express";
import { router } from "./routes/api";
import { PORT } from "./config";


try {
} catch (err) {
  console.error("Connecting to database failed with error, " + err);
}


const app = express();
app.use(express.json());
app.use(router);


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});

