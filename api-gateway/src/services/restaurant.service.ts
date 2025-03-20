import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MenuItem } from 'src/common/dto/entity_objects/menu_item';
import { Restaurant } from 'src/common/dto/entity_objects/restaurant';
import { CreateMenuItemDto } from 'src/common/dto/restaurant/create_menu_item.dto';
import { CreateRestaurantDto } from 'src/common/dto/restaurant/create_restaurant.dto';
import { UpdateMenuItemDto } from 'src/common/dto/restaurant/update_menu_item.dto';
import { UpdateRestaurantDto } from 'src/common/dto/restaurant/update_restaurant.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RestaurantService {
  constructor(
    @Inject('RESTAURANT_SERVICE') private restaurantServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  async getRestaurants(city: string) {
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

  async searchRestaurants(city: string, name: string) {
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

  async getRestaurantById(id: string) {
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

  async getMenuItemInRestaurantById(id: string, menuId: string) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('findMenuItemInRestaurantById', [
          id,
          menuId,
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

  async searchMenuItemsInRestaurantByName(id: string, name: string) {
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
  async createRestaurant(newRestaurant: CreateRestaurantDto) {
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

  async createMenuItem(id: string, newMenuItem: CreateMenuItemDto) {
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

  async updateRestaurant(id: string, updateRestaurant: UpdateRestaurantDto) {
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

  async updateMenuItem(
    id: string,
    menuId: string,
    updateMenuItem: UpdateMenuItemDto,
  ) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('updateMenuItem', [
          id,
          menuId,
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

  async deleteRestaurant(id: string) {
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

  async deleteMenuItem(id: string, menuId: string) {
    try {
      const menuItem: MenuItem = await firstValueFrom(
        this.restaurantServiceClient.send('deleteMenuItem', [id, menuId]),
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
