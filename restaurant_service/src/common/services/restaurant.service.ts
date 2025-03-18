import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantInterface } from 'src/common/interfaces/create_restaurant.interface';
import { UpdateRestaurantInterface } from 'src/common/interfaces/update_restaurant.interface';
import { Restaurant } from 'src/entity/restaurant.entity';
import { DeleteResult, Like, MoreThan, Repository } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  async findRestaurantById(id: number): Promise<Restaurant | null> {
    return this.restaurantsRepository.findOneBy({ id: id });
  }
  async findAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantsRepository.find();
  }

  async findRestaurantsByCity(city: string): Promise<Restaurant[]> {
    return this.restaurantsRepository.find({
      where: { address: { city: city } },
    });
  }

  async filterRestaurantsByCuisineAndRating(cuisine: string, rating: number) {
    return this.restaurantsRepository.find({
      where: { cuisine: cuisine, rating: MoreThan(rating) },
    });
  }

  async searchRestaurantsByName(name: string): Promise<Restaurant[]> {
    return this.restaurantsRepository.find({
      where: { name: Like(`%${name}%`) },
    });
  }

  async findRestaurantByName(name: string): Promise<Restaurant | null> {
    return this.restaurantsRepository.findOneBy({ name: name });
  }

  async createRestaurant(restaurant: CreateRestaurantInterface): Promise<Restaurant> {
    if (!restaurant)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    if (await this.findRestaurantByName(restaurant.name)) {
      throw new HttpException(
        'Restaurant already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = this.restaurantsRepository.create({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      phone: restaurant.phone,
      operatingHours: restaurant.operatingHours,
      address: { id: restaurant.addressId },
    });
    return this.restaurantsRepository.save(data);
  }

  async updateRestaurant(
    id: number,
    restaurant: UpdateRestaurantInterface,
  ): Promise<Restaurant> {
    const data = await this.restaurantsRepository.findOneBy({ id });
    if (!data) {
      throw new HttpException('Restaurant not found', HttpStatus.NOT_FOUND);
    }
    if (!restaurant) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    try {
      return this.restaurantsRepository.save({
        id: id,
        name: restaurant.name ? restaurant.name : data.name,
        cuisine: restaurant.cuisine ? restaurant.cuisine : data.cuisine,
        phone: restaurant.phone ? restaurant.phone : data.phone,
        operatingHours: restaurant.operatingHours
          ? restaurant.operatingHours
          : data.operatingHours,
      });
    } catch {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteRestaurant(id: number): Promise<DeleteResult> {
    return this.restaurantsRepository.delete(id);
  }
}
