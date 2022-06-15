import { IPermissionsRepository } from "../repositories/permission/IPermissionRepository";
import PermissionPrismaRepository from "../repositories/permission/PermissionPrismaRepository";
import { IPerfilRepository } from "../repositories/perfil/IPerfilRepository";
import PerfilPrismaRepository from "../repositories/perfil/PerfilPrismaRepository";
import { IPermissionsPerfilsRepository } from "../repositories/permissionsPerfils/IPermissionsPerfilsRepository";
import PermissionsPerfilsPrismaRepository from "../repositories/permissionsPerfils/PermissionsPerfilsPrismaRepository";
import validate from "../validators/validate";
import permissionValidator from "../validators/permissionValidator";
import { PerfilCreateDTO } from "../dto/PerfilCreateDto";
import { ResponseError } from "../errors/ResponseError";
import { Const } from "../utils/const";

class PerfilService {
  constructor(
    private readonly perfilRepository: IPerfilRepository,
    private readonly permissionRepository: IPermissionsRepository,
    private readonly permissionsPerfils: IPermissionsPerfilsRepository
  ) {}
  async create(perfil: PerfilCreateDTO): Promise<any> {
    const body = perfil;
    const data = await validate(permissionValidator, body);
    const perfilExists = await this.perfilRepository.findByName(perfil.name);
    const permissionExists = await this.permissionRepository.findByIds(
      perfil.permissions
    );
    if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else if (perfilExists) {
      throw new ResponseError("Perfil já existe", Const.httpStatus.BAD_REQUEST);
    } else if (!permissionExists) {
      throw new ResponseError("Permissões inválidas", Const.httpStatus.BAD_REQUEST);
    }
    await this.perfilRepository.create(perfil.name, perfil.descricao);
    const perfil_id = await this.perfilRepository.findByLastId();
    parseInt(perfil_id);

    return await this.permissionsPerfils.create(
      perfil_id,
      perfil.permissions
    );
  }
}
export default new PerfilService(
  PerfilPrismaRepository,
  PermissionPrismaRepository,
  PermissionsPerfilsPrismaRepository
);
