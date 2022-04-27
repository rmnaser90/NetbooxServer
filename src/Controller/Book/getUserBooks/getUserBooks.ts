import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookController from "../../../Handlers/BookController";
import Errors from "../../../Errors/Errors";
const bookController = new BookController();

export const getUserBookInit = () =>
  async function (req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;
      if (user) {
        const books = await bookController.getUserBooks(user);
        res.send(books);
      }
    } catch (error) {
      res.status(400).send(Errors.BAD_REQUEST);
    }
  };
