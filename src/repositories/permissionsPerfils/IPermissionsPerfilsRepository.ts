interface IPermissionsPerfilsRepository {
  create: (perfil_id: number, permission_id: number[]) => Promise<any>;
}
export { IPermissionsPerfilsRepository };
