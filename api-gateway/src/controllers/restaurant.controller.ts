import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMenuItemDto } from 'src/common/dto/restaurant/create_menu_item.dto';
import { CreateRestaurantDto } from 'src/common/dto/restaurant/create_restaurant.dto';
import { UpdateMenuItemDto } from 'src/common/dto/restaurant/update_menu_item.dto';
import { UpdateRestaurantDto } from 'src/common/dto/restaurant/update_restaurant.dto';
import { FindOneParams } from 'src/common/dto/find_one_params';
import { FindRestaurantMenuParams } from 'src/common/dto/find_restaurant_menu_params';
import { RestaurantService } from 'src/services/restaurant.service';

@Controller()
export class RestaurantController {
  constructor(
    private logger = new Logger('Restaurant Controller'),
    private readonly restaurantService: RestaurantService,
  ) {}

  @Get('/restaurants')
  async getRestaurants(@Query('city') city: string) {
    this.logger.log(`Fetching restaurants in city ${city}`);
    return await this.restaurantService.getRestaurants(city);
  }

  @Get('/restaurants/search/')
  async searchRestaurants(
    @Query('city') city: string,
    @Query('name') name: string,
  ) {
    this.logger.log(
      `Fetching search for restaurants in city ${city} by name ${name}`,
    );
    return await this.restaurantService.searchRestaurants(city, name);
  }

  @Get('/restaurants/:id')
  async getRestaurantById(@Param('id') { id }: FindOneParams) {
    this.logger.log(`Fetching restaurant with id ${id}`);
    return await this.restaurantService.getRestaurantById(id);
  }

  @Get('/restaurants/:id/menu/:menu_id')
  async getMenuItemInRestaurantById(
    @Param() { id, menuId }: FindRestaurantMenuParams,
  ) {
    this.logger.log(`Fetching menu item with id ${id}`);
    return await this.restaurantService.getMenuItemInRestaurantById(id, menuId);
  }

  @Get('restaurant/:id/menu')
  async searchMenuItemsInRestaurantByName(
    @Param('id') { id }: FindOneParams,
    @Query('name') name: string,
  ) {
    this.logger.log(
      `Fetching search for menu items in restaurant with id ${id} by name ${name}`,
    );
    return await this.restaurantService.searchMenuItemsInRestaurantByName(
      id,
      name,
    );
  }

  @Post('/restaurant/create')
  async createRestaurant(@Body() newRestaurant: CreateRestaurantDto) {
    this.logger.log(`Creating new restaurant`);
    return await this.restaurantService.createRestaurant(newRestaurant);
  }

  @Post('/restaurant/:id/menu/')
  async createMenuItem(
    @Param('id') { id }: FindOneParams,
    @Body() newMenuItem: CreateMenuItemDto,
  ) {
    this.logger.log(`Creating new menu item`);
    return await this.restaurantService.createMenuItem(id, newMenuItem);
  }

  @Put('/restaurant/:id')
  async updateRestaurant(
    @Param('id') { id }: FindOneParams,
    @Body() updateRestaurant: UpdateRestaurantDto,
  ) {
    this.logger.log(`Updating restaurant with id ${id}`);
    return await this.restaurantService.updateRestaurant(id, updateRestaurant);
  }

  @Put('/restaurant/:id/menu/:menu_id')
  async updateMenuItem(
    @Param() { id, menuId }: FindRestaurantMenuParams,
    @Body() updateMenuItem: UpdateMenuItemDto,
  ) {
    this.logger.log(`Updating menu item with id ${id}`);
    return await this.restaurantService.updateMenuItem(
      id,
      menuId,
      updateMenuItem,
    );
  }

  @Delete('/restaurant/:id')
  async deleteRestaurant(@Param('id') { id }: FindOneParams) {
    this.logger.log(`Deleting restaurant with id ${id}`);
    return await this.restaurantService.deleteRestaurant(id);
  }

  @Delete('/restaurant/:id/menu/:menu_id')
  async deleteMenuItem(@Param() { id, menuId }: FindRestaurantMenuParams) {
    this.logger.log(`Deleting menu item with id ${id}`);
    return await this.restaurantService.deleteMenuItem(id, menuId);
  }
}
