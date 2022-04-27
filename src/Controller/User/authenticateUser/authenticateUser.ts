import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import { getUserInfo } from "../../../Handlers/UserHandler";

export const authenticatUserInit = () =>
  function (req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (user) {
      res.send({ err: false, user: getUserInfo(user) });
      return;
    }
    res.end();
  };
