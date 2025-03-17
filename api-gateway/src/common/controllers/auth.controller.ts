import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Redirect,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/common/dto/user';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from 'src/common/dto/user/create_user.dto';
import { LoginUserDto } from 'src/common/dto/user/login_user.dto';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  @Post('/register')
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('createUser', user),
      );
      if (!userResponse)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      const data: { userId: number; username: string } = {
        userId: userResponse.id,
        username: user.username,
      };
      const token: string = await firstValueFrom(
        this.authServiceClient.send('createToken', data),
      );
      return {
        message: 'User created successfully',
        data: {
          user: data,
          token: token,
        },
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  async loginUser(@Body() user: LoginUserDto): Promise<any> {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('searchUserByCredentials', user),
      );
      if (!userResponse) {
        throw new HttpException(
          'Password or username is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
      const data: { userId: number; username: string } = {
        userId: userResponse.id,
        username: user.username,
      };
      const token: string = await firstValueFrom(
        this.authServiceClient.send('createToken', data),
      );
      return {
        message: 'User logged in successfully',
        data: {
          user: user,
          token: token,
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
  @Get('/profile')
  async getProfile(@Request() req): Promise<any> {
    const userId: number = req.user.userId;
    const userResponse: User = await firstValueFrom(
      this.userServiceClient.send('searchUserById', userId),
    );
    if (!userResponse) {
      throw new HttpException('User profile not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User profile fetched successfully',
      data: {
        username: userResponse.username,
        email: userResponse.email,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
      },
    };
  }

  @Post('/logout')
  logoutUser(): void {
    Redirect('/');
  }
}
