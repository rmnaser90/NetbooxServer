import { Request, Response } from "express";
import UserController from "../../../Handlers/UserHandler/UserHandler";
import Errors from "../../../Errors/Errors";

const userHandler = new UserController();
export const signInInit = () =>
  async function (req: Request, res: Response) {
    try {

      const { email, password } = req.body;
      const dbRes = await userHandler.signInByEmail(email, password);
      res.send(dbRes);
      
    } catch (error) {
      res.status(401).send({ ...Errors.BAD_REQUEST, error });
    }
  };
