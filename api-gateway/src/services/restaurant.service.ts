import { Injectable, Logger } from '@nestjs/common';
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
    private logger = new Logger('Restaurant Service'),
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
      this.logger.log(`Restaurants in city ${city} fetched successfully`);
      return {
        message: 'Restaurants fetched successfully',
        data: restaurants,
      };
    } catch (error) {
      this.logger.error(
        `failed to fetch restaurants in city ${city}`,
        error.stack,
      );
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
      this.logger.log(
        `Search for restaurants in city ${city} by name ${name} fetched successfully`,
      );
      return {
        message: 'Restaurants fetched successfully',
        data: restaurants,
      };
    } catch (error) {
      this.logger.error(
        `failed to fetch search for restaurants in city ${city} with name ${name}`,
        error.stack,
      );
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
      this.logger.log(`Restaurant with id ${id} fetched successfully`);
      return {
        message: 'Restaurant fetched successfully',
        data: restaurant,
      };
    } catch (error) {
      this.logger.error(
        `failed to fetch restaurant with id: ${id}`,
        error.stack,
      );
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
      this.logger.log(`MenuItem with id ${id} fetched successfully`);
      return {
        message: 'MenuItem fetched successfully',
        data: menuItem,
      };
    } catch (error) {
      this.logger.error(`failed to fetch menuItem with id: ${id}`, error.stack);
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
      this.logger.log(
        `Search for menu items in restaurant with id ${id} by name ${name} fetched successfully`,
      );
      return {
        message: 'MenuItems fetched successfully',
        data: menuItems,
      };
    } catch (error) {
      this.logger.error(
        `failed to fetch search for menu items in restaurant with id ${id} with name ${name}`,
        error.stack,
      );
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
      this.logger.log(
        `New restaurant with name ${restaurant.name} created successfully`,
      );
      return {
        message: 'Restaurant created successfully',
        data: restaurant,
      };
    } catch (error) {
      this.logger.error(
        `failed to create new restaurant, restaurant details: ${JSON.stringify(newRestaurant)}`,
        error.stack,
      );
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
      this.logger.log(
        `New MenuItem with name ${menuItem.name} created successfully`,
      );
      return {
        message: 'new MenuItem created successfully',
        data: menuItem,
      };
    } catch (error) {
      this.logger.error(
        `failed to create new MenuItem, MenuItem details: ${JSON.stringify(newMenuItem)}`,
        error.stack,
      );
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
      this.logger.log(`Restaurant with id ${id} updated successfully`);
      return {
        message: 'Restaurant updated successfully',
        data: restaurant,
      };
    } catch (error) {
      this.logger.error(
        `failed to update restaurant with id: ${id}, updating fields: ${JSON.stringify(updateRestaurant)}`,
        error.stack,
      );
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
      this.logger.log(`MenuItem with id ${id} updated successfully`);
      return {
        message: 'MenuItem updated successfully',
        data: menuItem,
      };
    } catch (error) {
      this.logger.error(
        `failed to update Menu Item with id: ${id}, updating fields: ${JSON.stringify(updateMenuItem)}`,
        error.stack,
      );
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
      this.logger.log(`Restaurant with id ${id} deleted successfully`);
      return {
        message: 'Restaurant deleted successfully',
        data: restaurant,
      };
    } catch (error) {
      this.logger.error(
        `failed to delete restaurant with id: ${id}`,
        error.stack,
      );
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
      this.logger.log(`MenuItem with id ${id} deleted successfully`);
      return {
        message: 'MenuItem deleted successfully',
        data: menuItem,
      };
    } catch (error) {
      this.logger.error(
        `failed to delete Menu Item with id: ${id}`,
        error.stack,
      );
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
