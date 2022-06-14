import { Request, Response } from "express";
import usersService from "../services/UserService";
import { Const } from "../utils/const";

class UserController {
  constructor() {}
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await usersService.create(req.body);
      return res.status(Const.httpStatus.CREATED).json({
        message: "Usuário criado com sucesso.",
        user,
      });
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const getUsers = await usersService.findAll();
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
      const user = await usersService.finOne(id);
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
      await usersService.delete(id);
      return res.status(Const.httpStatus.OK).json({
        message: "Usuário deletado com sucesso.",
      });
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
}
export default new UserController();
