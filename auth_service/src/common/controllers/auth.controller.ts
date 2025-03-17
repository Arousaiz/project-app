import { Controller } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { payloadDto } from 'src/common/interfaces/payload.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('createToken')
  async createToken(data: payloadDto) {
    const token = await this.authService.createToken(
      data.userId,
      data.username,
    );
    return token;
  }

  @MessagePattern('verifyToken')
  verifyToken(token: string) {
    return this.authService.verifyToken(token);
  }

  @MessagePattern('decodeToken')
  decodeToken(token: string) {
    return this.authService.decodeToken(token);
  }
}
