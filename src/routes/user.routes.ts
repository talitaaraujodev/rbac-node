import { Router } from "express";
import UsersController from "../controllers/UserController";
import { is } from "../middlewares/permission";
import authValidator from "../auth/authValidator";
const usersRouter = Router();

usersRouter.get(
  "/users",
  authValidator,
  is(["Administrador", "Cliente"]),
  UsersController.findAll
);
usersRouter.get(
  "/users/:id",
  authValidator,
  is(["Administrador", "Cliente"]),
  UsersController.findOne
);
usersRouter.post(
  "/users",
  authValidator,
  is(["Administrador", "Cliente"]),
  UsersController.create
);
usersRouter.delete(
  "/users/:id",
  authValidator,
  is(["Administrador", "Cliente"]),
  UsersController.delete
);
usersRouter.get("/me", authValidator, UsersController.me);

module.exports = usersRouter;
