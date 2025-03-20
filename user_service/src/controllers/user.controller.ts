import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'src/entity/user.entity';
import { CreateUserInterface } from '../common/interfaces/create_user.interface';
import { LoginUserInterface } from '../common/interfaces/login_user.interface';
import { ResponseUserInterface } from '../common/interfaces/response_user.interface';
import { UpdateUserInterface } from '../common/interfaces/update_user.interface';
import { UpdateUserCredentialsInterface } from '../common/interfaces/update_user_credentials.interface';
import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async createUser(user: CreateUserInterface): Promise<ResponseUserInterface> {
    return await this.userService.createUser(user);
  }

  @MessagePattern('searchUserByCredentials')
  async searchUserByCredentials(
    user: LoginUserInterface,
  ): Promise<ResponseUserInterface | null> {
    return await this.userService.searchUserByCredentials(user);
  }

  @MessagePattern('findAllUsers')
  async findAllUsers(): Promise<ResponseUserInterface[]> {
    return await this.userService.findAllUsers();
  }

  @MessagePattern('findUserById')
  async findUserById(id: string): Promise<User | null> {
    return await this.userService.findUserById(id);
  }

  @MessagePattern('getUserProfile')
  async getUserProfile(id: string): Promise<ResponseUserInterface> {
    return await this.userService.getUserProfile(id);
  }

  @MessagePattern('findUserByUsername')
  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userService.findUserByUsername(username);
  }

  @MessagePattern('deleteUser')
  async deleteUser(id: string): Promise<any> {
    await this.userService.deleteUser(id);
  }

  @MessagePattern('updateUser')
  async updateUser(id: string, user: UpdateUserInterface): Promise<any> {
    return await this.userService.updateUser(id, user);
  }

  @MessagePattern('updateUserByCredentials')
  async updateUserByUsernameAndPassword(
    id: string,
    user: UpdateUserCredentialsInterface,
  ): Promise<any> {
    return await this.userService.updateUserByUsernameAndPassword(id, user);
  }
}
