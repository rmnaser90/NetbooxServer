import { writeFile } from "fs";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
const env = dotenv.config();
const app: Express = express();
import * as userApi from './server/routes/userApi'

app.use(express.json());

app.use('/user',userApi.default)

const { PORT } = process.env;
app.listen(PORT, function () {
  console.log("up and running on port " + PORT);
});
