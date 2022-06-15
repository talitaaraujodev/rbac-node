import { Request, Response } from "express";
import permissionService from "../services/PermissionService";
import { Const } from "../utils/const";

class PermissionController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = await permissionService.create(req.body);
      return res.status(Const.httpStatus.OK).json(data);
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
}
export default new PermissionController();
