import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuItemInterface } from 'src/common/interfaces/create_menu_item.interface';
import { UpdateMenuItemInterface } from 'src/common/interfaces/update_menu_item.interface';
import { MenuItem } from 'src/entity/menu_item.entity';
import { DeleteResult, Like, Repository, In } from 'typeorm';

@Injectable()
export class MenuItemService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemsRepository: Repository<MenuItem>,
  ) {}

  async findAllMenuItems(): Promise<MenuItem[]> {
    return this.menuItemsRepository.find();
  }

  async findMenuItemsByIds(ids: number[]): Promise<MenuItem[]> {
    return this.menuItemsRepository.find({ where: { id: In(ids) } });
  }

  async getMenuItemPricesByIds(ids: number[]): Promise<Map<number, number>> {
    const menuItems = await this.findMenuItemsByIds(ids);
    const prices: Map<number, number> = new Map<number, number>();
    menuItems.forEach((item) => prices.set(item.id, item.price));
    return prices;
  }

  async findMenuItemById(id: number): Promise<MenuItem | null> {
    return this.menuItemsRepository.findOneBy({ id: id });
  }

  async findMenuItemsByRestaurantId(id: number): Promise<MenuItem[]> {
    return this.menuItemsRepository.find({
      relations: { restaurant: true },
      where: { restaurant: { id: id } },
    });
  }

  async findMenuItemByName(
    restaurantId: number,
    name: string,
  ): Promise<MenuItem | null> {
    return this.menuItemsRepository.findOneBy({
      name: name,
      restaurant: { id: restaurantId },
    });
  }

  async searchMenuItemsByName(name: string, id: number): Promise<MenuItem[]> {
    return this.menuItemsRepository.find({
      where: { name: Like(`%${name}%`), restaurant: { id: id } },
    });
  }

  async filterMenuItemsByCategory(
    restaurantId: number,
    categoryId: number,
  ): Promise<MenuItem[]> {
    return this.menuItemsRepository.findBy({
      category: { id: categoryId },
      restaurant: { id: restaurantId },
    });
  }

  async createMenuItem(
    restaurantId: number,
    menuItem: CreateMenuItemInterface,
  ): Promise<MenuItem> {
    if (!menuItem)
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    if (await this.findMenuItemByName(restaurantId, menuItem.name)) {
      throw new HttpException(
        'Menu item already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const data = this.menuItemsRepository.create({
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      restaurant: { id: menuItem.restaurantId },
      category: { id: menuItem.categoryId },
    });
    return this.menuItemsRepository.save(data);
  }

  async updateMenuItem(
    id: number,
    menuItem: UpdateMenuItemInterface,
  ): Promise<MenuItem> {
    const data = await this.menuItemsRepository.findOneBy({ id });
    if (!data) {
      throw new HttpException('Menu item not found', HttpStatus.NOT_FOUND);
    }
    if (!menuItem) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
    return this.menuItemsRepository.save({
      id: id,
      name: menuItem.name ? menuItem.name : data.name,
      description: menuItem.description
        ? menuItem.description
        : data.description,
      price: menuItem.price ? menuItem.price : data.price,
      category: {
        id: menuItem.categoryId ? menuItem.categoryId : data.category.id,
      },
    });
  }

  async deleteMenuItem(id: number): Promise<DeleteResult> {
    return this.menuItemsRepository.delete(id);
  }
}
