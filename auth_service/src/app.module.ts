import { Module } from '@nestjs/common';
import { AuthController } from './common/controllers/auth.controller';
import { AuthService } from './common/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigService } from './config/jwt_config_service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
      inject: [JwtConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
