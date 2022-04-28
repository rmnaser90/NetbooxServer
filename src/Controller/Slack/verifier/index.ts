import { NextFunction, Request, Response } from "express";

const slackVerifierInit =()=> (req: Request, res: Response, next: NextFunction) =>
  res.send(req.body);

  export default slackVerifierInit