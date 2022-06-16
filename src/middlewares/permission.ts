import { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { User } from "../entities/User";

async function decoder(req: Request): Promise<User | any> {
  const authHeader = req.headers.authorization || "";

  const [, token] = authHeader?.split(" ");

  const payload = decode(token);

  const user = await UserService.findOne(Number(payload?.subject.sub));

  return Array(user);
}

function is(perfil: String) {
  const perfilAuthorized = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let user = await decoder(req);

    const userPerfil = user?.map((perfil: any) => perfil.userPerfil.name);

    const existsPerfil = userPerfil?.some((pe: any) => perfil.includes(pe));
    if (existsPerfil) {
      return next();
    }

    return res.status(401).json({ message: "Not authorized!" });
  };

  return perfilAuthorized;
}

export { is };
