import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookHandler from "../../../Handlers/BookHandler/BookHandler";
import Errors from "../../../Errors/Errors";

const bookHandler = new BookHandler();
export const addToShelfInit = () =>
  async function (req: AuthenticatedRequest, res: Response) {
    try {
      const { bookISBN } = req.body;
      const user = req.user;

      if (bookISBN && user) {
        const dbRes = await bookHandler.addToShelf(user, bookISBN);
        res.send({ message: "saved ", dbRes });
        return;
      }
      res.status(400).send({ message: "book is unavailable" });
    } catch (error) {
      res.status(400).send(Errors.BAD_REQUEST);
    }
  };
