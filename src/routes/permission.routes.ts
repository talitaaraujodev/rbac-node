import { Router } from "express";
import PermissionController from "../controllers/PermissionController";

const permissionsRouter = Router();

permissionsRouter.post("/permissoes", PermissionController.create);

module.exports = permissionsRouter;
