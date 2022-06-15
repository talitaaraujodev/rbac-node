import { User } from "../../entities/User";
import { UserCreateDTO } from "../../dto/UserCreateDto";
import { UserAuthDTO } from "../../dto/UserAuthDto";
import { UserPayload } from "../../dto/UserPayloadDto";
import { UserToken } from "../../dto/UserTokenDto";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { prisma } from "../../database/prisma";
import * as bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "../../auth/auth";
import { ResponseError } from "../../errors/ResponseError";
import { Const } from "../../utils/const";

class UserPrismaRepository implements IUserRepository {
  constructor() {}

  async create(userCreateDto: UserCreateDTO): Promise<User> {
    const data = {
      ...userCreateDto,
      password: await bcrypt.hash(userCreateDto.password, 10),
    };
    const user = await prisma.user.create({
      data,
    });
    delete user.password;
    return user;
  }
  async auth(data: UserAuthDTO): Promise<UserToken> {
    const user = await this.findByEmail(data.email);
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );

      if (isPasswordValid) {
        const payload: UserPayload = {
          sub: user.id,
          email: user.email,
          name: user.name,
        };
        return {
          token: sign(
            {
              subject: payload,
              expiresIn: auth.jwt.expiresIn,
            },
            auth.jwt.secret
          ),
        };
      }
    }
    throw new ResponseError(
      "Email e/o senha inválidos",
      Const.httpStatus.UNAUTHORIZED
    );
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
  async findByLastId(): Promise<any> {
    const lastId = await prisma.user.findMany({
      select: { id: true },
      orderBy: { id: "desc" },
      take: 1,
    });
    return lastId.map((item) => item.id);
  }
}
export default new UserPrismaRepository();
