import { IUserRepository } from "../repositories/IUserRepository";
import UserPrismaRepository from "../repositories/UserPrismaRepository";
import { User } from "../entities/User";
import { UserCreateDTO } from "../dto/UserCreateDto";
import { ResponseError } from "../errors/ResponseError";
import { Const } from "../utils/const";
import validate from "../validators/validate";
import userCreateValidator from "../validators/userCreateValidator";

class UserService {
  constructor(private readonly userRepository: IUserRepository) {}
  async create(userCreateDto: UserCreateDTO): Promise<User> {
    const body = userCreateDto;
    const data = await validate(userCreateValidator, body);
    const emailExists = await this.userRepository.findByEmail(
      userCreateDto.email
    );
    if (emailExists) {
      throw new ResponseError(
        "Email já cadastrado.",
        Const.httpStatus.BAD_REQUEST
      );
    } else if (data.errors) {
      throw new ResponseError(data.errors, Const.httpStatus.BAD_REQUEST);
    }
    return await this.userRepository.create(userCreateDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    if (users.length < 0) {
      return [];
    }
    return users;
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
export default new UserService(UserPrismaRepository);
