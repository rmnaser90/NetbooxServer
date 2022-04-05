import express, { Express } from "express";
import dotenv from "dotenv";
const env = dotenv.config();
const app: Express = express();
import userApi from "./server/routes/userApi";


app.use(express.json());
app.use("/user", userApi.router);

const { PORT } = process.env;
app.listen(PORT, function () {
  console.log("up and running on port " + PORT);
});
