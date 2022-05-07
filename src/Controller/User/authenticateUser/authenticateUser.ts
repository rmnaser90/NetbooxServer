import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import { getUserInfo } from "../../../Handlers/UserHandler/UserHandler";

export const authenticatUserInit =  () =>
async function (req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (user) {
      const books = await user.getBooks()
      user.books= books
      res.send({ err: false, user: getUserInfo(user) });
      return;
    }
    res.end();
  };
