import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookHandler from "../../../Handlers/BookHandler/BookHandler";
import Errors from "../../../Errors/Errors";
import { Book } from "../../../Database";

const bookHandler = new BookHandler();
export const addReviewInit = () =>
  async function (req: AuthenticatedRequest, res: Response) {
    try {
      const { bookISBN,text } = req.body;
      const user = req.user;

      const book = await Book.findOne({ where: { isbn10: bookISBN?.toString() } });
      if (book && user && text) {
        const dbRes = await bookHandler.addReview(book,user,text);
        res.send({ message: "saved ", dbRes });
        return;
      }
      res.status(400).send({ message: "nothing to add" });
    } catch (error) {
      res.status(400).send(Errors.BAD_REQUEST);
    }
  };
