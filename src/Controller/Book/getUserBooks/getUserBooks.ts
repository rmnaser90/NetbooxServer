import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookHandler from "../../../Handlers/BookHandler/BookHandler";
import Errors from "../../../Errors/Errors";
const bookHandler = new BookHandler();

export const getUserBookInit = () =>
  async function (req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;
      if (user) {
        const books = await bookHandler.getUserBooks(user);
        res.send(books);
      }
    } catch (error) {
      res.status(400).send(Errors.BAD_REQUEST);
    }
  };
