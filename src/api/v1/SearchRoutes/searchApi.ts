import express, { Router } from "express";
import { searchBook } from "../../../Controller";
import GoogleAPI from "../../../Integrations/GoogleBooks";

const googleApi = new GoogleAPI();

const router: Router = express.Router();

router.get("/", searchBook);


export default { router };
