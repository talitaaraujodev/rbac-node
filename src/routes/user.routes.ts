import { Router } from "express";
import UsersController from "../controllers/UserController";
import { is } from "../middlewares/permission";
import authValidator from "../auth/authValidator";
const usersRouter = Router();

usersRouter.get(
  "/users",
  authValidator,
  is("Administrador"),
  UsersController.findAll
);
usersRouter.get(
  "/users/:id",
  authValidator,
  is("Administrador"),
  UsersController.findOne
);
usersRouter.post(
  "/users",
  authValidator,
  is("Administrador"),
  UsersController.create
);
usersRouter.delete(
  "/users/:id",
  authValidator,
  is("Administrador"),
  UsersController.delete
);

module.exports = usersRouter;
