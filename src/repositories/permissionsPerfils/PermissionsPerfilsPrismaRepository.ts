import { IPermissionsPerfilsRepository } from "../permissionsPerfils/IPermissionsPerfilsRepository";
import { prisma } from "../../database/prisma";

class PermissionsPerfilsPrismaRepository
  implements IPermissionsPerfilsRepository
{
  async create(perfil_id: number, permission_id: number[]): Promise<any> {
    for (const pe of permission_id) {
      await prisma.permissionsPerfils.create({
        data: {
          perfil_id: Number(perfil_id),
          permission_id: pe,
        },
      });
    }
  }
}
export default new PermissionsPerfilsPrismaRepository();
