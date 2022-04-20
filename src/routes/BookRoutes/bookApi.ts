import express, { Router, Request, Response, NextFunction } from "express";
import { Request2 } from "../../Authentication/auth";
import GoogleAPI from "../../Integrations/GoogleBooks";
import BookController from "../../Database/BookDbManager";
import Errors from "../../Errors/Errors";
const googleApi = new GoogleAPI();
const bookController = new BookController();
const router: Router = express.Router();

router.post("/addToShelf", async function (req: Request2, res: Response) {
  try {
    const { bookISBN } = req.body;
    const user = req.user;

    if (bookISBN && user) {
      const dbRes = await bookController.addToShelf(user, bookISBN);
      res.send({ message: "saved ", dbRes });
      return;
    }
    res.status(400).send({ message: "book is unavailable" });
  } catch (error) {
    res.status(400).send(Errors.BAD_REQUEST);
  }
});
router.get("/userBooks", async function (req: Request2, res: Response) {
  try {
    const user = req.user;
    if (user) {
      const books = await bookController.getUserBooks(user);
      res.send(books);
    }
  } catch (error) {
    res.status(400).send(Errors.BAD_REQUEST);
  }
});
router.delete("/deleteUserBook", async function (req: Request2, res: Response) {
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
});

export default { router };
