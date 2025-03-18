import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './common/controllers/auth.controller';
import { OrderController } from './common/controllers/order.controller';
import { RestaurantController } from './common/controllers/restaurant.controller';
import { UserController } from './common/controllers/user.controller';
import { ConfigModule } from '@nestjs/config';
import { ClientsModuleConfigService } from './config/clients_module_config_service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ClientsModuleConfigService) =>
          configService.createClientOptionsByName('AUTH'),
        inject: [ClientsModuleConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: (configService: ClientsModuleConfigService) =>
          configService.createClientOptionsByName('USER'),
        inject: [ClientsModuleConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'RESTAURANT_SERVICE',
        useFactory: (configService: ClientsModuleConfigService) =>
          configService.createClientOptionsByName('RESTAURANT'),
        inject: [ClientsModuleConfigService],
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        useFactory: (configService: ClientsModuleConfigService) =>
          configService.createClientOptionsByName('ORDER'),
        inject: [ClientsModuleConfigService],
      },
    ]),
  ],
  controllers: [
    AuthController,
    OrderController,
    RestaurantController,
    UserController,
  ],
  providers: [],
})
export class AppModule {}
