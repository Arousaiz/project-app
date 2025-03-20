import { Body, Controller, Logger, Post, Redirect } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user/create_user.dto';
import { LoginUserDto } from 'src/common/dto/user/login_user.dto';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AuthController {
  constructor(
    private logger = new Logger('Auth Controller'),
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    this.logger.log(`Creating user ${user.username}`);
    return await this.authService.createUser(user);
  }

  @Post('/login')
  async loginUser(@Body() user: LoginUserDto): Promise<any> {
    this.logger.log(`Logging in user ${user.username}`);
    return await this.authService.loginUser(user);
  }

  @Post('/logout')
  logoutUser(): void {
    this.logger.log(`Logging out user`);
    Redirect('/');
  }
}
