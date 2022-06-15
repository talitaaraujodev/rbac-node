import PermissionPrismaRepository from "../repositories/permission/PermissionPrismaRepository";
import { IPermissionRepository } from "../repositories/permission/IPermissionRepository";
import { Permission } from "../entities/Permission";
import validate from "../validators/validate";
import permissionValidator from "../validators/permissionValidator";
import { PermissionCreateDTO } from "../dto/PermissionCreateDto";
import { ResponseError } from "../errors/ResponseError";
import { Const } from "../utils/const";

class PermissionService {
  constructor(private readonly permissionRepository: IPermissionRepository) {}
  async create(permission: PermissionCreateDTO): Promise<Permission> {
    const body = permission;
    const data = validate(permissionValidator, body);
    const permissionExists = await this.permissionRepository.findByName(
      permission.name
    );
    if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else if (permissionExists) {
      throw new ResponseError(
        "Permissão já existe",
        Const.httpStatus.BAD_REQUEST
      );
    }
    return await this.permissionRepository.create(permission);
  }
}
export default new PermissionService(PermissionPrismaRepository);
