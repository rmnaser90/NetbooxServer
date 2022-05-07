import express, { Request, Response, Router } from "express";
import { addReview, addToShelf, deleteUserBooks, getUserBooks } from "../../../Controller";
import { Book, Review, User } from "../../../Database";

const router: Router = express.Router();
const test = async function () {
  const review = await Review.create({ text: "best book ever" });
  const book = await Book.findOne({
    where: {
      isbn10: "9004213821",
    },
  });

  const user = await User.findOne({
    where: {
      id: 1,
    },
  });
  if (user && book) {
    const userRes = await user.addReview(review);
    const bookRes = await book.addReview(review);
    return { userRes, bookRes };
  }
};

router.post("/addToShelf", addToShelf);
router.get("/userBooks", getUserBooks);
router.delete("/deleteUserBook", deleteUserBooks);
router.get("/addReview", addReview);

export default { router };
