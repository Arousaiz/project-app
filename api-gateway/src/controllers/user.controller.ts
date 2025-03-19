import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/common/dto/entity_objects/user';
import { UpdateUserDto } from 'src/common/dto/user/update_user.dto';
import { UpdateUserCredentialsDto } from 'src/common/dto/user/update_user_credentials.dto';
import { firstValueFrom } from 'rxjs';

@Controller()
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  // @UseGuards(AuthGuard) roles
  @Get('/users')
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

  // @UseGuards(AuthGuard) roles
  @Get('/users/:id')
  async getUser(@Param('id') id: number) {
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

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getUserProfile(@Request() req) {
    try {
      const userId: number = req.user.userId;
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

  @UseGuards(AuthGuard)
  @Put('/profile')
  async updateUser(@Request() req, @Body() user: UpdateUserDto) {
    try {
      const userId: number = req.user.userId;
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

  @UseGuards(AuthGuard)
  @Put('/profile/password')
  async updatePassword(@Request() req, @Body() user: UpdateUserCredentialsDto) {
    try {
      const userId: number = req.user.userId;
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

  @UseGuards(AuthGuard)
  @Delete('/profile')
  async deleteUser(@Request() req) {
    try {
      const userId: number = req.user.userId;
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
