import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import Errors from "../../../Errors/Errors";

export const signOutInit =
  () => async (req: AuthenticatedRequest, res: Response) => {
    try {
      const user = req.user;
      if (user) {
        user.set("isLoggedIn", false);
        await user.save();
        res.send({ message: " logged out succesfully" });
      }
    } catch (error) {
      res.status(401).send({ ...Errors.BAD_REQUEST, error });
    }
  };
