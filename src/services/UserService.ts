import { IUserRepository } from "../repositories/user/IUserRepository";
import UserPrismaRepository from "../repositories/user/UserPrismaRepository";
import { User } from "../entities/User";
import { UserCreateDTO } from "../dto/UserCreateDto";
import { ResponseError } from "../errors/ResponseError";
import { Const } from "../utils/const";
import validate from "../validators/validate";
import userCreateValidator from "../validators/userCreateValidator";
import userAuthValidator from "../validators/userAuthValidator";
import { UserAuthDTO } from "../dto/UserAuthDto";
import { IUsersPerfilsRepository } from "../repositories/usersPerfils/IUsersPerfilsRepository";
import UsersPerfilsPrismaRepository from "../repositories/usersPerfils/UsersPerfilsPrismaRepository";
import { IPerfilRepository } from "../repositories/perfil/IPerfilRepository";
import PerfilPrismaRepository from "../repositories/perfil/PerfilPrismaRepository";

class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly usersPerfilsRepository: IUsersPerfilsRepository,
    private readonly perfilRepository: IPerfilRepository
  ) {}
  async auth(user: UserAuthDTO) {
    const body = user;
    const data = await validate(userAuthValidator, body);
    if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    }
    return await this.userRepository.auth(user);
  }
  async create(userCreateDto: UserCreateDTO): Promise<User> {
    const body = userCreateDto;
    const data = await validate(userCreateValidator, body);
    const emailExists = await this.userRepository.findByEmail(
      userCreateDto.email
    );
    const perfilsExists = await this.perfilRepository.findByIds(
      userCreateDto.perfil
    );
    if (emailExists) {
      throw new ResponseError(
        "Email já cadastrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    } else if (!perfilsExists) {
      throw new ResponseError("Perfil inválido", Const.httpStatus.BAD_REQUEST);
    }
    const createdUser = {
      name: userCreateDto.name,
      email: userCreateDto.email,
      password: userCreateDto.password,
    };
    await this.userRepository.create(createdUser);
    const user_id = await this.userRepository.findByLastId();
    parseInt(user_id);
    return await this.usersPerfilsRepository.create(
      user_id,
      userCreateDto.perfil
    );
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async finOne(id: number): Promise<any> {
    const user = await this.userRepository.finOne(id);
    if (!user) {
      throw new ResponseError(
        "Usuário não encontrado",
        Const.httpStatus.BAD_REQUEST
      );
    }
    return user;
  }

  async delete(id: number): Promise<User> {
    const user = await this.userRepository.finOne(id);
    if (!user) {
      throw new ResponseError(
        "Usuário não encontrado",
        Const.httpStatus.BAD_REQUEST
      );
    }
    return await this.userRepository.delete(id);
  }
}
export default new UserService(
  UserPrismaRepository,
  UsersPerfilsPrismaRepository,
  PerfilPrismaRepository
);
