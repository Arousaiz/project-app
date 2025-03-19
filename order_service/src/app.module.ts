import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDetailsService } from './services/delivery_details.service';
import { OrderItemService } from './services/order_item.service';
import { AddressService } from './services/address.service';
import { OrderController } from './controllers/order.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database_config_service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    DeliveryDetailsService,
    OrderItemService,
    AddressService,
  ],
})
export class AppModule {}
