import express, { Router, Request, Response, NextFunction } from "express";
import User, { UserModel } from "../../Database/Models/User";
import DbManager from "../../Database/DbManager";
import Errors from "../../Errors/Errors";
import { Request2 } from "../../Authentication/auth";
import GoogleAPI from "../../Integrations/GoogleBooks";
import BookController from "../../Database/BookDbManager";
const googleApi = new GoogleAPI();
const bookController = new BookController();
const router: Router = express.Router();

router.get("/query/:keyword", async function (req: Request2, res: Response) {
  const { keyword } = req.params;
  console.log(keyword);

  const books = await googleApi.searchBooks({ keyword });
  bookController.addBulkBook(books);
  res.send(books);
});

export default { router };
