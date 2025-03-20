import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/common/dto/entity_objects/user';
import { UpdateUserDto } from 'src/common/dto/user/update_user.dto';
import { UpdateUserCredentialsDto } from 'src/common/dto/user/update_user_credentials.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  async getUsers() {
    try {
      const users: User[] = await firstValueFrom(
        this.userServiceClient.send('findAllUsers', {}),
      );
      if (!users) {
        throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Users fetched successfully',
        data: users,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUser(id: string) {
    try {
      const user: User = await firstValueFrom(
        this.userServiceClient.send('getUserProfile', id),
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'User fetched successfully', data: user };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserProfile(userId: string) {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('getUserProfile', userId),
      );
      if (!userResponse) {
        throw new HttpException('User profile not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'User profile fetched successfully',
        data: {
          userResponse,
        },
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUser(userId: string, user: UpdateUserDto) {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('updateUser', [userId, user]),
      );
      if (!userResponse) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return { message: 'User updated successfully', data: userResponse };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateUserCredentials(userId: string, user: UpdateUserCredentialsDto) {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('updateUserByCredentials', [userId, user]),
      );
      if (!userResponse) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'User credentials updated successfully',
        data: userResponse,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(userId: string) {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('deleteUser', userId),
      );
      if (!userResponse) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }
      return { message: 'User deleted successfully', data: userResponse };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
