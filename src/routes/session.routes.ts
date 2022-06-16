import { Router } from "express";
import SessionController from "../controllers/SessionController";
const sessionsRouter = Router();

sessionsRouter.post("/auth", SessionController.create);

module.exports = sessionsRouter;
