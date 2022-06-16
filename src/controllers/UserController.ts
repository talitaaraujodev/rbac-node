import { Request, Response } from "express";
import userService from "../services/UserService";
import { Const } from "../utils/const";
import { decode } from "jsonwebtoken";

class UserController {
  constructor() {}
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.create(req.body);
      return res.status(Const.httpStatus.CREATED).json({
        message: "Usuário criado com sucesso.",
        user,
      });
    } catch (error: any) {
      console.log(error);
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const getUsers = await userService.findAll();
    try {
      return res.status(Const.httpStatus.OK).json(getUsers);
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.findOne(id);
      return res.status(Const.httpStatus.OK).json(user);
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      await userService.delete(id);
      return res.status(Const.httpStatus.OK).json({
        message: "Usuário deletado com sucesso.",
      });
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
  async me(req: Request, res: Response): Promise<Response> {
    try {
      const authHeader = req.headers.authorization;
      const [, token]: any = authHeader?.split(" ");
      const payload: any = decode(token);
      const id = parseInt(payload?.subject.sub);
      const user = await userService.findOne(id);
      return res.status(Const.httpStatus.OK).json(user);
    } catch (error: any) {
      console.log(error);
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
}
export default new UserController();
