import { Request, Response } from "express";
import userService from "../services/UserService";
import { Const } from "../utils/const";

class UserController {
  constructor() {}
  async create(req: Request, res: Response): Promise<Response> {
    try {
      await userService.create(req.body);
      return res.status(Const.httpStatus.CREATED).json({
        message: "Usuário criado com sucesso.",
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
      const user = await userService.finOne(id);
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
        message: "Usu�rio deletado com sucesso.",
      });
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
}
export default new UserController();
