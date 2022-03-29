import express, { Express, Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/signIn", function (req: Request, res: Response) {
  const user = { email: "rami@monday.com" };
  res.send(user);
});

export default router;
