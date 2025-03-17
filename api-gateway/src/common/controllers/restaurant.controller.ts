import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MenuItem } from 'src/common/dto/menuItem';
import { Restaurant } from 'src/common/dto/restaurant';
import { CreateMenuItemDto } from 'src/common/dto/restaurant/create_menu_item.dto';
import { CreateRestaurantDto } from 'src/common/dto/restaurant/create_restaurant.dto';
import { UpdateMenuItemDto } from 'src/common/dto/restaurant/update_menu_item.dto';
import { UpdateRestaurantDto } from 'src/common/dto/restaurant/update_restaurant.dto';
import { firstValueFrom } from 'rxjs';
import { AppService } from 'src/common/services/app.service';

@Controller()
export class RestaurantController {
  constructor(
    private readonly appService: AppService,
    @Inject('RESTAURANT_SERVICE') private restaurantServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  @Get('/restaurants')
  async getRestaurants(@Query('city') city: string) {
    try {
      const restaurants: Restaurant = await firstValueFrom(
        this.restaurantServiceClient.send('findRestaurants', city),
      );
      if (!restaurants) {
        throw new HttpException('Restaurants not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Restaurants fetched successfully',
        data: restaurants,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/restaurants/search/')
  async searchRestaurants(
    @Query('city') city: string,
    @Query('name') name: string,
  ) {
    try {
      const restaurants: Restaurant[] = await firstValueFrom(
        this.restaurantServiceClient.send('searchRestaurants', [city, name]),
      );
      if (!restaurants) {
        throw new HttpException('Restaurants not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Restaurants fetched successfully',
        data: restaurants,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/restaurants/:id')
  async getRestaurantById(@Param('id') id: number) {
    try {
      const restaurant: Restaurant = await firstValueFrom(
        this.restaurantServiceClient.send('findRestaurantById', id),
      );
      if (!restaurant) {
        throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'Restaurant fetched successfully',
        data: restaurant,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/restaurants/:id/menu/:menu_id')
  async getMenuItemInRestaurantById(
    @Param('id') id: number,
    @Param('menu_id') menu_id: number,
  ) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('findMenuItemInRestaurantById', [
          id,
          menu_id,
        ]),
      );
      if (!menuItem) {
        throw new HttpException('MenuItem not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'MenuItem fetched successfully',
        data: menuItem,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('restaurant/:id/menu')
  async searchMenuItemsInRestaurantByName(
    @Param('id') id: number,
    @Query('name') name: string,
  ) {
    try {
      const menuItems: MenuItem[] = await firstValueFrom(
        this.restaurantServiceClient.send('searchMenuItemsInRestaurantByName', {
          id,
          name,
        }),
      );
      if (!menuItems) {
        throw new HttpException('MenuItems not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'MenuItems fetched successfully',
        data: menuItems,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/restaurant/create')
  async createRestaurant(@Body() newRestaurant: CreateRestaurantDto) {
    try {
      const restaurant: Restaurant = await firstValueFrom(
        this.restaurantServiceClient.send('createRestaurant', newRestaurant),
      );
      if (!restaurant)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return {
        message: 'Restaurant created successfully',
        data: restaurant,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/restaurant/:id/menu/')
  async createMenuItem(
    @Param('id') id: number,
    @Body() newMenuItem: CreateMenuItemDto,
  ) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('createMenuItem', {
          id,
          newMenuItem,
        }),
      );
      if (!menuItem)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return {
        message: 'new MenuItem created successfully',
        data: menuItem,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/restaurant/:id')
  async updateRestaurant(
    @Param('id') id: number,
    @Body() updateRestaurant: UpdateRestaurantDto,
  ) {
    try {
      const restaurant: Restaurant = await firstValueFrom(
        this.restaurantServiceClient.send('updateRestaurant', [
          id,
          updateRestaurant,
        ]),
      );
      if (!restaurant)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return {
        message: 'Restaurant updated successfully',
        data: restaurant,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/restaurant/:id/menu/:menu_id')
  async updateMenuItem(
    @Param('id') id: number,
    @Param('menu_id') menu_id: number,
    @Body() updateMenuItem: UpdateMenuItemDto,
  ) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('updateMenuItem', [
          id,
          menu_id,
          updateMenuItem,
        ]),
      );
      if (!menuItem)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return {
        message: 'MenuItem updated successfully',
        data: menuItem,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/restaurant/:id')
  async deleteRestaurant(@Param('id') id: number) {
    try {
      const restaurant: Restaurant = await firstValueFrom(
        this.restaurantServiceClient.send('deleteRestaurant', id),
      );
      if (!restaurant)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return {
        message: 'Restaurant deleted successfully',
        data: restaurant,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/restaurant/:id/menu/:menu_id')
  async deleteMenuItem(
    @Param('id') id: number,
    @Param('menu_id') menu_id: number,
  ) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('deleteMenuItem', [id, menu_id]),
      );
      if (!menuItem)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return {
        message: 'MenuItem deleted successfully',
        data: menuItem,
      };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
