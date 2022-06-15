import { PermissionCreateDTO } from "../../dto/PermissionCreateDto";
import { Permission } from "../../entities/Permission";
import { IPermissionsRepository } from "./IPermissionRepository";
import { prisma } from "../../database/prisma";

class PermissionPrismaRepository implements IPermissionsRepository {
  async create(permission: PermissionCreateDTO): Promise<Permission> {
    return await prisma.permission.create({ data: permission });
  }
  async findByName(name: string): Promise<Permission | any> {
    return await prisma.permission.findUnique({ where: { name } });
  }
  async findByIds(ids: number[]): Promise<any> {
    const permissions = await prisma.permission.findMany({
      where: { id: { in: ids } },
    });
    return permissions;
  }
}

export default new PermissionPrismaRepository();
