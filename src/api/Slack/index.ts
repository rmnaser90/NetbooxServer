import { Router } from "express";
import { slackEventListener, slackVerifier } from "../../Controller";
const slackRouter = Router();

slackRouter.post("/", slackEventListener);
slackRouter.use("/", slackVerifier);
export default slackRouter;
