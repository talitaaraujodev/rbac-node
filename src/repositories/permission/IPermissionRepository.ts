import { PermissionCreateDTO } from "../../dto/PermissionCreateDto";
import { Permission } from "../../entities/Permission";

interface IPermissionsRepository {
  create: (permission: PermissionCreateDTO) => Promise<Permission>;
  findByName: (name: string) => Promise<Permission>;
  findByIds: (id: number[]) => Promise<any>;
}
export { IPermissionsRepository };
