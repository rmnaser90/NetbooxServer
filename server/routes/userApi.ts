import express, { Router, Request, Response } from "express";
import User, { UserAttributes } from "../models/User";
import DbManager from "../models/DbManager";
import Errors from "../Errors/Errors";

const dbManager = new DbManager();
const router: Router = express.Router();

router.post("/signUp", async function (req: Request, res: Response) {
  try {
    const user = req.body as UserAttributes;
    user.isLoggedIn = true;
    const dbRes = await dbManager.signUp(user);
    res.send(dbRes);
  } catch (error) {
    res.send({...Errors.BAD_REQUEST,error});
  }
});

router.get("/signIn", async function (req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const dbRes = await dbManager.signInByEmail(email, password);
    res.send(dbRes);
  } catch (error) {
    res.send({...Errors.BAD_REQUEST,error});
  }
});
export default {router};
