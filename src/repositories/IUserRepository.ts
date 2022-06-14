import { User } from "../entities/User";
import { UserCreateDTO } from "../dto/UserCreateDto";

interface IUserRepository {
  create: (userCreateDto: UserCreateDTO) => Promise<User>;
  findAll: () => Promise<User[]>;
  finOne: (id: number) => Promise<User>;
  findByEmail: (email: string) => Promise<any>;
  delete: (id: number) => Promise<User>;
}
export { IUserRepository };
