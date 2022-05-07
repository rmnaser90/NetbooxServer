import { Request, Response } from "express";
import {Review, User } from "../../../Database";


export const getReviewsInit = () =>
  async function (req: Request, res: Response) {
    try {
      const { bookISBN } = req.query;
      if (bookISBN) {
        const reviews = await Review.findAll({
          where: {
            bookIsbn10: bookISBN.toString(),
          },
          order: [['createdAt', 'DESC']],
          attributes:["text","updatedAt","id"],
          include:{model:User,attributes:["fullName","id"]},
        });

        res.send(reviews || []);
        return;
      }
      res.send([]);
    } catch (error) {
      res.send([]);
    }
  };
