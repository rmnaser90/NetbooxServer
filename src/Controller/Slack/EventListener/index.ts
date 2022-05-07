import { Request, Response, NextFunction } from "express";
import SlackEvents from "../../../Integrations/SlackChat";
const slackEvents = new SlackEvents();

const slackEventLisetnerInit =
  () => async (req: Request,
     res: Response,
     next: NextFunction) => {
    const event = req.body.event;
    slackEvents.eventHandler(event);
    next();
  };

export default slackEventLisetnerInit;
