import { NextFunction, Request, Response } from "express";
import UserController from "../../../Handlers/UserHandler/UserHandler";
import { UserModel } from "../../../Database/Models/User";
import Errors from "../../../Errors/Errors";
const userController = new UserController();
export const signUpInit =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserModel = req.body;
      user.isLoggedIn = true;
      const dbRes = await userController.signUp(user);
      if (dbRes.err) res.status(401);
      res.send(dbRes);
    } catch (error) {
      res.status(401).send({ ...Errors.BAD_REQUEST, error });
    }
  };
