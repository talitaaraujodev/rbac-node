import { Router } from "express";
import PermissionController from "../controllers/PermissionController";
import { is } from "../middlewares/permission";
import authValidator from "../auth/authValidator";
const permissionsRouter = Router();

permissionsRouter.post(
  "/permissoes",
  authValidator,
  is(["Administrador"]),
  PermissionController.create
);

module.exports = permissionsRouter;
