import { Response } from "express";
import { AuthenticatedRequest } from "../../../Authentication/auth";
import BookController from "../../../Handlers/BookController";
import Errors from "../../../Errors/Errors";
import { ContactUsForm } from "../../../Types/Types";
import GoogleSearch from "../../../Integrations/GoogleSearch";
import MondayBoard from "../../../Integrations/MondayBoard";

const googleEngine = new GoogleSearch();
const mondayBoard = new MondayBoard();
export const contactUsInit = () =>
async function (req: AuthenticatedRequest, res: Response) {
  try {
    const message: ContactUsForm = req.body;
    if (message.fullName && message.q) {
      const result = await googleEngine.searchGoogle(message.q.toString());
      const mondayRes = await mondayBoard.addItems(message,result)
      const boards = await mondayBoard.getBoards()
      res.send({mondayRes});
      return;
    }
    res.status(400).send({ message: " cannot find" });
  } catch (error) {
    res.status(400).send(Errors.BAD_REQUEST);
  }
}