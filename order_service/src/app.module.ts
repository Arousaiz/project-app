import { Module } from '@nestjs/common';
import { OrderService } from './common/services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryDetailsService } from './common/services/delivery_details.service';
import { OrderItemService } from './common/services/order_item.service';
import { AddressService } from './common/services/address.service';
import { OrderController } from './common/controllers/order.controller';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/databaseConfigService';

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
