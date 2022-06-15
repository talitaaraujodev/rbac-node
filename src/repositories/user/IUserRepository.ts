import { User } from "../../entities/User";
import { UserCreateDTO } from "../../dto/UserCreateDto";
import { UserAuthDTO } from "../../dto/UserAuthDto";
import { UserToken } from "../../dto/UserTokenDto";

interface IUserRepository {
  create: (userCreateDto: UserCreateDTO) => Promise<User>;
  auth: (userAuthDto: UserAuthDTO) => Promise<UserToken>;
  findAll: () => Promise<User[]>;
  finOne: (id: number) => Promise<User>;
  findByEmail: (email: string) => Promise<any>;
  delete: (id: number) => Promise<User>;
  findByLastId: () => Promise<any>;
}
export { IUserRepository };
