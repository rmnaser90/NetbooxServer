import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookHandler from "../../../Handlers/BookHandler/BookHandler";
import Errors from "../../../Errors/Errors";
import { Book, Review, User } from "../../../Database";

const bookHandler = new BookHandler();
export const removeReviewInit = () =>
  async function (req: AuthenticatedRequest, res: Response) {
    try {
      const { reviewId } = req.body;

      const user = req.user;
      const review = await Review.findOne({
        where: {
          id: reviewId,
        },
      });

      if (review?.userId == user?.id) {
        await review?.destroy();
        res.send({ err: false, msg: "deleted" });
      } else {
        res.send({ err: true, msg: "cannot delete, not autherized" });
      }
    } catch (error) {
      res.status(400).send(Errors.BAD_REQUEST);
    }
  };
