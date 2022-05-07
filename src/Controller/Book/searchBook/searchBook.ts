import { Request, Response } from "express";
import GoogleAPI from "../../../Integrations/GoogleBooks";
import BookHandler from "../../../Handlers/BookHandler/BookHandler";

import Errors from "../../../Errors/Errors";
const googleApi = new GoogleAPI();
const bookHandler = new BookHandler();

export const searchBookInit = () =>
  async function (req: Request, res: Response) {
    try {
      const { q } = req.query;
      if (q) {
        console.log(q);
        const books = await googleApi.searchBooks({ keyword: q.toString() });
        if (books) bookHandler.addBulkBook(books);
        res.send(books);
        return;
      }
      res.send({ err: true, message: " cannot find" });
    } catch (error) {
      res.send(Errors.BAD_REQUEST);
    }
  };
