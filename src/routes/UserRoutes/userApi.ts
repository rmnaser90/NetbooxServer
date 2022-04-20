import express, { Router, Request, Response, NextFunction } from "express";
import User, { UserModel } from "../../Database/Models/User";
import DbManager from "../../Database/DbController/UserController";
import Errors from "../../Errors/Errors";
import auth, { Request2 } from "../../Authentication/auth";

const dbManager = new DbManager();
const router: Router = express.Router();

router.post(
  "/signUp",
  async function (req: Request, res: Response, next: NextFunction) {
    try {
      const user: UserModel = req.body;
      user.isLoggedIn = true;
      const dbRes = await dbManager.signUp(user);
      if (dbRes.err) res.status(401);
      res.send(dbRes);
    } catch (error) {
      res.status(401).send({ ...Errors.BAD_REQUEST, error });
    }
  }
);

router.put("/signIn", async function (req: Request, res: Response) {
  const { email, password } = req.body;
  console.log(email,password);
  
  try {
    const dbRes = await dbManager.signInByEmail(email, password);
    if (dbRes.err) {
      res.status(401);
    }
    res.send(dbRes);

    // res.send(dbRes);
  } catch (error) {
    res.status(401).send({ ...Errors.BAD_REQUEST, error });
  }
});
router.put('/signOut',auth,async (req:Request2,res:Response) => {
  try {
    const user = req.user
    if (user) {
      const dbRes = await user.update("isLoggedIn",false)
      res.send({message:" logged out succesfully"})
    }
  } catch (error) {
    res.status(401).send({ ...Errors.BAD_REQUEST, error });
  
  }
  
})

export default { router };
