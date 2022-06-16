import { Perfil } from "../../entities/Perfil";
import { IPerfilRepository } from "./IPerfilRepository";
import { prisma } from "../../database/prisma";

class PerfilPrismaRepository implements IPerfilRepository {
  async findByLastId(): Promise<any> {
    const lastId = await prisma.perfil.findMany({
      select: { id: true },
      orderBy: { id: "desc" },
      take: 1,
    });
    return lastId.map((item) => item.id);
  }
  async create(name: string, descricao: string): Promise<Perfil> {
    const data = { name, descricao };
    return prisma.perfil.create({ data });
  }
  async findByName(name: string): Promise<Perfil | any> {
    return prisma.perfil.findUnique({ where: { name } });
  }
  async findByIds(ids: number[]): Promise<any> {
    const perfils = await prisma.permission.findMany({
      where: { id: { in: ids } },
    });
    return perfils;
  }
  async findById(id: number): Promise<any> {
    return await prisma.permission.findMany({
      where: { id },
    });
  }
}
export default new PerfilPrismaRepository();
