import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Restaurants')
@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiOperation({ summary: 'Get all restaurants in city' })
  @Get('/restaurants')
  async getRestaurants(@Query('city') city: string) {
    return await this.restaurantService.getRestaurants(city);
  }

  @ApiOperation({ summary: 'Search restaurants in city by name' })
  @Get('/restaurants/search/')
  async searchRestaurants(
    @Query('city') city: string,
    @Query('name') name: string,
  ) {
    return await this.restaurantService.searchRestaurants(city, name);
  }

  @ApiOperation({ summary: 'Get restaurant by id' })
  @Get('/restaurants/:id')
  async getRestaurantById(@Param('id') { id }: FindOneParams) {
    return await this.restaurantService.getRestaurantById(id);
  }

  @ApiOperation({ summary: 'Get menu item in restaurant by id' })
  @Get('/restaurants/:id/menu/:menu_id')
  async getMenuItemInRestaurantById(
    @Param() { id, menuId }: FindRestaurantMenuParams,
  ) {
    return await this.restaurantService.getMenuItemInRestaurantById(id, menuId);
  }

  @ApiOperation({ summary: 'Search menu items in restaurant by name' })
  @Get('restaurant/:id/menu')
  async searchMenuItemsInRestaurantByName(
    @Param('id') { id }: FindOneParams,
    @Query('name') name: string,
  ) {
    return await this.restaurantService.searchMenuItemsInRestaurantByName(
      id,
      name,
    );
  }

  @ApiOperation({ summary: 'Create new restaurant' })
  @Post('/restaurant/create')
  async createRestaurant(@Body() newRestaurant: CreateRestaurantDto) {
    return await this.restaurantService.createRestaurant(newRestaurant);
  }

  @ApiOperation({ summary: 'Create new menu item in restaurant' })
  @Post('/restaurant/:id/menu/')
  async createMenuItem(
    @Param('id') { id }: FindOneParams,
    @Body() newMenuItem: CreateMenuItemDto,
  ) {
    return await this.restaurantService.createMenuItem(id, newMenuItem);
  }

  @ApiOperation({ summary: 'Update restaurant info' })
  @Put('/restaurant/:id')
  async updateRestaurant(
    @Param('id') { id }: FindOneParams,
    @Body() updateRestaurant: UpdateRestaurantDto,
  ) {
    return await this.restaurantService.updateRestaurant(id, updateRestaurant);
  }

  @ApiOperation({ summary: 'Update menu item info in restaurant' })
  @Put('/restaurant/:id/menu/:menu_id')
  async updateMenuItem(
    @Param() { id, menuId }: FindRestaurantMenuParams,
    @Body() updateMenuItem: UpdateMenuItemDto,
  ) {
    return await this.restaurantService.updateMenuItem(
      id,
      menuId,
      updateMenuItem,
    );
  }

  @ApiOperation({ summary: 'Delete restaurant' })
  @Delete('/restaurant/:id')
  async deleteRestaurant(@Param('id') { id }: FindOneParams) {
    return await this.restaurantService.deleteRestaurant(id);
  }

  @ApiOperation({ summary: 'Delete menu item in restaurant' })
  @Delete('/restaurant/:id/menu/:menu_id')
  async deleteMenuItem(@Param() { id, menuId }: FindRestaurantMenuParams) {
    return await this.restaurantService.deleteMenuItem(id, menuId);
  }
}
