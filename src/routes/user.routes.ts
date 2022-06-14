import { Router } from "express";
import UsersController from "../controllers/UserController";

const usersRouter = Router();

usersRouter.get("/users", UsersController.findAll);
usersRouter.get("/users/:id", UsersController.findOne);
usersRouter.post("/users", UsersController.create);
usersRouter.delete("/users/:id", UsersController.delete);

module.exports = usersRouter;
