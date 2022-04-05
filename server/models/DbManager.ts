import { Op, Model } from "sequelize";
import User, { UserAttributes } from "./User";
import Book from "./Book";
import bcrypt from "bcryptjs";
import Errors from "../Errors/Errors";
class DbManager {
  async signInByEmail(email: string, password: string) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (user) {
        const isCorrect = bcrypt.compareSync(
          password,
          user.getDataValue("password")
        );

        if (isCorrect) {
          user.set("isLoggedIn", "TRUE");
          await user.save();
          return { err: false, user };
        } else {
          return Errors.WRONG_PASSWORD;
        }
      } else {
        return Errors.INVALID_EMAIL;
      }
    } catch (error) {
      return {...Errors.BAD_REQUEST,error}
    }
  }

  async signUp(user: UserAttributes) {
    try {
      const { fullName, email, password, agreed, isLoggedIn = true } = user;
      if (password) {
        const user = User.build({
          fullName,
          email,
          password,
          agreed,
          isLoggedIn,
        });
        await user.save();
        return { err: false, user };
      } else {
        return Errors.INVALID_PASSWORD;
      }
    } catch (error) {
      return {...Errors.BAD_REQUEST,error};
    }
  }
}

export default DbManager;
