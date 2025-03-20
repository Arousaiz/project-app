import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/common/dto/entity_objects/user';
import { CreateUserDto } from 'src/common/dto/user/create_user.dto';
import { LoginUserDto } from 'src/common/dto/user/login_user.dto';
import { payloadDto } from '../common/dto/user/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private logger = new Logger('Auth Service'),
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
  ) {}

  async createUser(user: CreateUserDto): Promise<any> {
    try {
      const userResponse: User = await firstValueFrom(
        this.userServiceClient.send('createUser', user),
      );
      if (!userResponse)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      const data: payloadDto = {
        userId: userResponse.id,
        username: user.username,
      };
      const token: string = await firstValueFrom(
        this.authServiceClient.send('createToken', data),
      );
      this.logger.log(`User ${user.username} created successfully`);
      return {
        message: 'User created successfully',
        data: {
          user: data,
          token: token,
        },
      };
    } catch (error) {
      this.logger.error(`failed to create user ${user.username}`, error.stack);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(user: LoginUserDto): Promise<any> {
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
      const data: payloadDto = {
        userId: userResponse.id,
        username: user.username,
      };
      const token: string = await firstValueFrom(
        this.authServiceClient.send('createToken', data),
      );
      this.logger.log(`User ${user.username} logged in successfully`);
      return {
        message: 'User logged in successfully',
        data: {
          user: user,
          token: token,
        },
      };
    } catch (error) {
      this.logger.error(`failed to login user ${user.username}`, error.stack);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
