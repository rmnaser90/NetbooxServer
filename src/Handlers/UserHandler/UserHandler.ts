import { UserModel } from "../../Database/Models/User";
import { User, Book } from "../../Database/index";
import bcrypt from "bcryptjs";
import Errors from "../../Errors/Errors";

export const authenticateUser = function (user: UserModel, password: string) {
  const hash = user.getDataValue("password");
  const isAuthenticated = bcrypt.compareSync(password, hash);
  return isAuthenticated;
};
export const getUserInfo = (user: UserModel) => {
  const { fullName, books, email, id } = user;
  return { fullName, books, email, id };
};

class UserController {
  async signInByEmail(userEmail: string, password: string) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
        include: [{ model: Book }],
      });

      if (!user) return Errors.INVALID_EMAIL;
      const isAuthenticated = authenticateUser(user, password);
      if (!isAuthenticated) return Errors.WRONG_PASSWORD;
      user.set("isLoggedIn", true);
      await user.save();
      return { err: false, user: getUserInfo(user) };
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
      return { err: false, user: getUserInfo(newUser) };
    } catch ({ errors }) {
      return { ...Errors.BAD_REQUEST, error: errors };
    }
  }
}

export default UserController;
