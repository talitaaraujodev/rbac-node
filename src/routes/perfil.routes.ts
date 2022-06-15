import { Router } from "express";
import PerfilController from "../controllers/PerfilController";

const perfilsRouter = Router();

perfilsRouter.post("/perfils", PerfilController.create);

module.exports = perfilsRouter;
