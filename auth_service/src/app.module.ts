import { Module } from '@nestjs/common';
import { AuthController } from './common/controllers/auth.controller';
import { AuthService } from './common/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthConfigService } from './config/authConfigService';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useClass: AuthConfigService,
      inject: [AuthConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
