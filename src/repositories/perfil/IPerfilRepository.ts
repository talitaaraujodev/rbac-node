import { Perfil } from "../../entities/Perfil";

interface IPerfilRepository {
  create: (name: string, descricao: string) => Promise<Perfil>;
  findByName: (name: string) => Promise<Perfil>;
  findByLastId: () => Promise<any>;
  findByIds(ids: number[]): Promise<any>;
  
}
export { IPerfilRepository };
