import { Body, Controller, Post, Redirect } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/common/dto/user/create_user.dto';
import { LoginUserDto } from 'src/common/dto/user/login_user.dto';
import { AuthService } from 'src/services/auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create new user account with credentials' })
  @Post('/register')
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    return await this.authService.createUser(user);
  }

  @ApiOperation({ summary: 'Login in account with credentials' })
  @Post('/login')
  async loginUser(@Body() user: LoginUserDto): Promise<any> {
    return await this.authService.loginUser(user);
  }

  @ApiOperation({ summary: 'Logout' })
  @Post('/logout')
  logoutUser(): void {
    Redirect('/');
  }
}
