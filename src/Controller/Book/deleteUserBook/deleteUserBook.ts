import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookController from "../../../Handlers/BookController";
import Errors from "../../../Errors/Errors";
const bookController = new BookController();

export const deleteUserBookInit = () =>
async function (req: AuthenticatedRequest, res: Response) {
  try {
    const user = req.user;
    const { bookISBN } = req.body;
    if (user && bookISBN) {
      const dbRes = await bookController.deleteUserBook(user, bookISBN);
      res.send(dbRes);
      return;
    }
    res.status(400).send({ message: "provide book isbn to delete" });
  } catch (error) {
    res.status(400).send(Errors.BAD_REQUEST);
  }
}