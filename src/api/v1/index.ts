import { Router } from "express";
import userApi from "./UserRoutes/userApi";
import searchApi from "./SearchRoutes/searchApi";
import customerSupport from "./CustomerSupport/customerSupport";
import auth from "../../Authentication/auth";
import bookApi from "./BookRoutes/bookApi";

const router = Router();
router.use("/shelf",auth, bookApi.router)
router.use("/user", userApi.router);
router.use("/search", searchApi.router);
router.use("/customerSupport", customerSupport.router);

export default router;
