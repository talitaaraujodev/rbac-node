import { Request, Response } from "express";
import perfilService from "../services/PerfilService";
import { Const } from "../utils/const";

class PerfilController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      await perfilService.create(req.body);
      return res
        .status(Const.httpStatus.OK)
        .json({ message: "Perfil criado com sucesso." });
    } catch (error: any) {
      return res
        .status(error.status || Const.httpStatus.ERROR_SERVER)
        .json(error);
    }
  }
}
export default new PerfilController();
