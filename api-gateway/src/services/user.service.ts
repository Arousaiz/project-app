import { Injectable, Logger } from '@nestjs/common';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'src/common/dto/entity_objects/user';
import { UpdateUserDto } from 'src/common/dto/user/update_user.dto';
import { UpdateUserCredentialsDto } from 'src/common/dto/user/update_user_credentials.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    private logger = new Logger('User Service'),
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
      this.logger.log('Users fetched successfully');
      return {
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error) {
      this.logger.error('failed to fetch users', error.stack);
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
      this.logger.log(`User with id ${id} fetched successfully`);
      return { message: 'User fetched successfully', data: user };
    } catch (error) {
      this.logger.error(`failed to fetch user with id: ${id}`, error.stack);
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
      this.logger.log(
        `Profile for user with id ${userId} fetched successfully`,
      );
      return {
        message: 'User profile fetched successfully',
        data: {
          userResponse,
        },
      };
    } catch (error) {
      this.logger.error(`failed to fetch user profile`, error.stack);
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
      this.logger.log(`User with id ${userId} updated successfully`);
      return { message: 'User updated successfully', data: userResponse };
    } catch (error) {
      this.logger.error(
        `failed to update user with id: ${userId}, updating fields: ${JSON.stringify(user)}`,
        error.stack,
      );
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
      this.logger.log(
        `Credentials of a user with id ${userId} updated successfully`,
      );
      return {
        message: 'User credentials updated successfully',
        data: userResponse,
      };
    } catch (error) {
      this.logger.error(
        `failed to update credentials of a user with id: ${userId}`,
        error.stack,
      );
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
      this.logger.log(`User with id ${userId} deleted successfully`);
      return { message: 'User deleted successfully', data: userResponse };
    } catch (error) {
      this.logger.error(
        `failed to delete user with id: ${userId}`,
        error.stack,
      );
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
