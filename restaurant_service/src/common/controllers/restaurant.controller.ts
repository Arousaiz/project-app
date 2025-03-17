import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRestaurantDto } from 'src/common/interfaces/create_restaurant.interface';
import { UpdateRestaurantDto } from 'src/common/interfaces/update_restaurant.interface';
import { RestaurantService } from 'src/common/services/restaurant.service';

import { Restaurant } from 'src/entity/restaurant.entity';

@Controller()
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @MessagePattern('findRestaurantById')
  async findRestaurantById(id: number) {
    return await this.restaurantService.findRestaurantById(id);
  }

  @MessagePattern('findRestaurants')
  async findRestaurantsByCity(city: string) {
    return await this.restaurantService.findRestaurantsByCity(city);
  }

  @MessagePattern('searchRestaurants')
  async searchRestaurantByName(name: string) {
    return await this.restaurantService.searchRestaurantsByName(name);
  }

  @MessagePattern('createRestaurant')
  async createRestaurant(restaurant: CreateRestaurantDto) {
    return await this.restaurantService.createRestaurant(restaurant);
  }

  @MessagePattern('updateRestaurant')
  async updateRestaurant(
    id: number,
    restaurant: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    return await this.restaurantService.updateRestaurant(id, restaurant);
  }

  @MessagePattern('deleteRestaurant')
  async deleteRestaurant(id: number) {
    return await this.restaurantService.deleteRestaurant(id);
  }
}
