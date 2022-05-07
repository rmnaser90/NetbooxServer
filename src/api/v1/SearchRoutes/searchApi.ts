import express, { Router } from "express";
import { getReviews, searchBook } from "../../../Controller";
import GoogleAPI from "../../../Integrations/GoogleBooks";

const googleApi = new GoogleAPI();

const router: Router = express.Router();

router.get("/", searchBook);
router.get("/reviews",getReviews)


export default { router };
