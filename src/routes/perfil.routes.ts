import { Router } from "express";
import PerfilController from "../controllers/PerfilController";
import { is } from "../middlewares/permission";
import authValidator from "../auth/authValidator";
const perfilsRouter = Router();

perfilsRouter.post(
  "/perfils",
  authValidator,
  is("Administrador"),
  PerfilController.create
);

module.exports = perfilsRouter;
