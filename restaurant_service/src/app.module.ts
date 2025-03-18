import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { Address } from './entity/address.entity';
import { Category } from './entity/category.entity';
import { MenuItem } from './entity/menu_item.entity';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigService } from './config/database_config_service';
import { MenuItemService } from './common/services/menu_item.service';
import { RestaurantService } from './common/services/restaurant.service';
import { RestaurantController } from './common/controllers/restaurant.controller';
import { MenuItemController } from './common/controllers/menu_item.controller';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
    TypeOrmModule.forFeature([Restaurant, Address, MenuItem, Category]),
  ],
  controllers: [RestaurantController, MenuItemController],
  providers: [MenuItemService, RestaurantService],
})
export class AppModule {}
