import { NextFunction, Request, Response } from "express";
import UserController from "../../../Handlers/UserHandler";
import { UserModel } from "../../../Database/Models/User";
import Errors from "../../../Errors/Errors";
const userController = new UserController();
export const signInInit = () =>
  async function (req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const dbRes = await userController.signInByEmail(email, password);
      if (dbRes.err) {
        res.status(401);
      }
      res.send(dbRes);
    } catch (error) {
      res.status(401).send({ ...Errors.BAD_REQUEST, error });
    }
  };
