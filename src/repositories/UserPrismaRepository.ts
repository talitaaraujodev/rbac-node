import { User } from "../entities/User";
import { UserCreateDTO } from "../dto/UserCreateDto";

import { IUserRepository } from "../repositories/IUserRepository";
import { prisma } from "../database/prisma";
import * as bcrypt from "bcryptjs";

class UsersRepositoryImp implements IUserRepository {
  constructor() {}

  async create(userCreateDto: UserCreateDTO): Promise<User> {
    const data = {
      ...userCreateDto,
      password: await bcrypt.hash(userCreateDto.password, 10),
    };
    const user = await prisma.user.create({
      data,
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async finOne(id: number): Promise<any> {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<any> {
    return await prisma.user.findUnique({ where: { email } });
  }

  async delete(id: number): Promise<User> {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
export default new UsersRepositoryImp();
