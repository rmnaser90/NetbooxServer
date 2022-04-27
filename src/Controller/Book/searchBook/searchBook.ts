import { Request, Response } from "express";
import GoogleAPI from "../../../Integrations/GoogleBooks";
import BookController from "../../../Handlers/BookController";

import Errors from "../../../Errors/Errors";
const googleApi = new GoogleAPI();
const bookController = new BookController();

export const searchBookInit = () =>
  async function (req: Request, res: Response) {
    try {
      const { q } = req.query;
      if (q) {
        const books = await googleApi.searchBooks({ keyword: q.toString() });
        await bookController.addBulkBook(books);
        res.send(books);
        return;
      }
      res.status(400).send({ message: " cannot find" });
    } catch (error) {
      res.status(400).send(Errors.BAD_REQUEST);
    }
  };
