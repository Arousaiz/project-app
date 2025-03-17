import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { User } from 'src/entity/user.entity';
import { CreateUserDto } from '../interfaces/create_user.interface';
import { LoginUserDto } from '../interfaces/login_user.interface';
import { ResponseUserDto } from '../interfaces/response_user.interface';
import { UpdateUserDto } from '../interfaces/update_user.interface';
import { UpdateUserCredentialsDto } from '../interfaces/update_user_credentials.interface';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('createUser')
  async createUser(user: CreateUserDto): Promise<ResponseUserDto> {
    return await this.userService.createUser(user);
  }

  @MessagePattern('searchUserByCredentials')
  async searchUserByCredentials(
    user: LoginUserDto,
  ): Promise<ResponseUserDto | null> {
    return await this.userService.searchUserByCredentials(user);
  }

  @MessagePattern('findAllUsers')
  async findAllUsers(): Promise<ResponseUserDto[]> {
    return await this.userService.findAllUsers();
  }

  @MessagePattern('findUserById')
  async findUserById(id: number): Promise<User | null> {
    return await this.userService.findUserById(id);
  }

  @MessagePattern('getUserProfile')
  async getUserProfile(id: number): Promise<ResponseUserDto> {
    return await this.userService.getUserProfile(id);
  }

  @MessagePattern('findUserByUsername')
  async findUserByUsername(username: string): Promise<User | null> {
    return await this.userService.findUserByUsername(username);
  }

  @MessagePattern('deleteUser')
  async deleteUser(id: number): Promise<any> {
    await this.userService.deleteUser(id);
  }

  @MessagePattern('updateUser')
  async updateUser(id: number, user: UpdateUserDto): Promise<any> {
    return await this.userService.updateUser(id, user);
  }

  @MessagePattern('updateUserByCredentials')
  async updateUserByUsernameAndPassword(
    id: number,
    user: UpdateUserCredentialsDto,
  ): Promise<any> {
    return await this.userService.updateUserByUsernameAndPassword(id, user);
  }
}
