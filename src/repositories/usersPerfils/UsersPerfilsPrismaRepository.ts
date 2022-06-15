import { IUsersPerfilsRepository } from "./IUsersPerfilsRepository";
import { prisma } from "../../database/prisma";

class UsersPerfilsPrismaRepository implements IUsersPerfilsRepository {
  async create(user_id: number, perfil_id: number[]): Promise<any> {
    for (const p of perfil_id) {
      await prisma.usersPerfils.create({
        data: {
          user_id: Number(user_id),
          perfil_id: p,
        },
      });
    }
  }
}
export default new UsersPerfilsPrismaRepository();
