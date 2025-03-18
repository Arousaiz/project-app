import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { payloadInterface } from 'src/common/interfaces/payload.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('createToken')
  async createToken(data: payloadInterface) {
    const token = await this.authService.createToken(
      data.userId,
      data.username,
    );
    return token;
  }

  @MessagePattern('verifyToken')
  async verifyToken(token: string) {
    return await this.authService.verifyToken(token);
  }

  @MessagePattern('decodeToken')
  async decodeToken(token: string) {
    return await this.authService.decodeToken(token);
  }
}
