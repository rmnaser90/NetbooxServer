import express, { Router } from "express";
import auth from "../../../Authentication/auth";

import { signUp, signIn, signOut, authenticatUser } from "../../../Controller";
const router: Router = express.Router();

router.post("/signUp", signUp);
router.put("/signIn", signIn);
router.put("/signOut", auth, signOut);
router.get("/authenticateUser", auth, authenticatUser);

export default { router };
