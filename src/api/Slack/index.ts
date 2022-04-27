import { Request, Router, Response, NextFunction } from "express";
import GoogleSearch from "../../Integrations/GoogleSearch";
import MondayBoard from "../../Integrations/MondayBoard";
import { ContactUsForm } from "../../Types/Types";
const mondayBoard = new MondayBoard();
const googleSearch = new GoogleSearch();
const slackRouter = Router();

slackRouter.post("/", async (req: Request, res: Response,next: NextFunction) => {
  const event = req.body.event;
  if (event) {
    const { user, text } = req.body.event;
    const message = text.split("<")[0];
    const link: string = await googleSearch.searchGoogle(message);
    const messageToSave: ContactUsForm = {
      fullName: user,
      message,
      q: message,
      email: user,
    };
    const modayRes = await mondayBoard.addItems(
      messageToSave,
      "https//www.google.com"
    );
  }
  next()
});

slackRouter.use("/", (req: Request, res: Response, next: NextFunction) => res.send(req.body)
);
export default slackRouter;
