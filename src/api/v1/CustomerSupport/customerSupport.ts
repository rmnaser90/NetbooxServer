import { Router } from "express";
import { contactUs } from "../../../Controller";
const router = Router()
router.post("/contactUs", contactUs);
export default {router}