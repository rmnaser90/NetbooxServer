import express, { Router, Request, Response, NextFunction } from "express";
import User, { UserModel } from "../../Database/Models/User";
import DbManager from "../../Database/DbController/UserController";
import Errors from "../../Errors/Errors";
import { Request2 } from "../../Authentication/auth";
import GoogleAPI from "../../Integrations/GoogleBooks";
import BookController from "../../Database/DbController/BookController";
const googleApi = new GoogleAPI();
const bookController = new BookController();
const router: Router = express.Router();

router.get("/", async function (req: Request2, res: Response) {
  try {
    const { q } = req.query;
    if (q) {
      const books = await googleApi.searchBooks({ keyword: q.toString() });
      bookController.addBulkBook(books);
      res.send(books);
      return;
    }
    res.status(400).send({ message: " cannot find" });
  } catch (error) {
    res.status(400).send(Errors.BAD_REQUEST);
  }
});

export default { router };
