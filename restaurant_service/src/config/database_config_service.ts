import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const pass: string | undefined =
      this.configService.get('DATABASE_PASSWORD');
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USER'),
      password: pass,
      database: this.configService.get('DATABASE_DB'),
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      migrationsTableName: 'migrations',
      migrations: ['src/migrations/**/*{.ts,.js}'],
    };
  }
}
