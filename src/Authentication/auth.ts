import { Response, Request, NextFunction } from "express";
import { UserModel } from "../Database/Models/User";
import { User } from "../Database";

export interface AuthenticatedRequest extends Request {
  user?: UserModel;
}

const auth = async function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userid: userId } = req.headers;
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user?.isLoggedIn) {
      req.user = user;
      next();
    } else {
      res.status(401).send({ message: "not authurized" });
    }
  } catch (error) {
    res.status(400).send({ error });
  }
};

export default auth;
