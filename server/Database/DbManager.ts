import { Op, Model } from "sequelize";
import User, { UserModel } from "./Models/User";
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

      if (!user) return Errors.INVALID_EMAIL;
      const hash = user.getDataValue("password");
      const isAuthenticated = bcrypt.compareSync(password, hash);
      
      if (!isAuthenticated) return Errors.WRONG_PASSWORD;
      user.set("isLoggedIn", true);
      await user.save();
      return { err: false, user };

    } catch ({ errors }) {
      return { ...Errors.BAD_REQUEST, error: errors };
    }
  }

  async signUp(user: UserModel) {
    try {
      const { fullName, email, password, agreed, isLoggedIn = true } = user;
        const newUser = User.build({
          fullName,
          email,
          password,
          agreed,
          isLoggedIn,
        });
        await newUser.save();
        return { err: false, user: newUser };
   
    } catch ({ errors }) {
      return { ...Errors.BAD_REQUEST, error: errors };
    }
  }
}

export default DbManager;