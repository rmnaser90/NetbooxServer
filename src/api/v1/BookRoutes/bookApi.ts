import express, { Router } from "express";
import { addToShelf, deleteUserBooks, getUserBooks } from "../../../Controller";

const router: Router = express.Router();

router.post("/addToShelf", addToShelf);
router.get("/userBooks", getUserBooks);
router.delete("/deleteUserBook", deleteUserBooks);

export default { router };
