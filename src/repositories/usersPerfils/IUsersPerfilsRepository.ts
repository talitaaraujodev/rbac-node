interface IUsersPerfilsRepository {
  create: (user_id: number, perfil_id: number[]) => Promise<any>;
}
export { IUsersPerfilsRepository };
