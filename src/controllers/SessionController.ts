import { Request, Response } from "express";
import userService from "../services/UserService";
import { Const } from "../utils/const";

class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await userService.auth(req.body);
      return res.status(Const.httpStatus.OK).json(data);
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
}
export default new SessionController();
