import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { payloadDto } from 'src/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async decodeToken(token: string): Promise<payloadDto | null> {
    if (!token)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    try {
      const decoded: payloadDto = await this.JwtService.decode(token);
      return decoded;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async verifyToken(token: string): Promise<payloadDto | null> {
    if (!token)
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    try {
      const decoded: payloadDto = await this.JwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      return decoded;
    } catch {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async createToken(userId: number, username: string): Promise<string> {
    if (!userId || !username)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    try {
      const token: string = await this.JwtService.signAsync({
        userId,
        username,
      });
      return token;
    } catch {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
