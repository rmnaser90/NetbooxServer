import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/api/v1";
import inititializeSequelize from "./src/Database";
import slackRouter from "./src/api/Slack";
const env = dotenv.config();
const app: Express = express();
inititializeSequelize({force:false})

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.use("/slack", slackRouter);

const { PORT } = process.env;
app.listen(PORT, function () {
  console.log("up and running on port " + PORT);
});
