import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateMenuItemDto } from 'src/common/interfaces/create_menu_item.interface';
import { UpdateMenuItemDto } from 'src/common/interfaces/update_menu_item.interface';
import { MenuItem } from 'src/entity/menu_item.entity';
import { MenuItemService } from 'src/common/services/menu_item.service';
import { DeleteResult } from 'typeorm';

@Controller()
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @MessagePattern('findMenuItemById')
  async findMenuItemById(id: number): Promise<MenuItem | null> {
    return await this.menuItemService.findMenuItemById(id);
  }

  @MessagePattern('findMenuItemsByRestaurantId')
  async findMenuItemsByRestaurantId(id: number): Promise<MenuItem[]> {
    return await this.menuItemService.findMenuItemsByRestaurantId(id);
  }

  @MessagePattern('searchMenuItemsByName')
  async searchMenuItemsByName(name: string, id: number): Promise<MenuItem[]> {
    return await this.menuItemService.searchMenuItemsByName(name, id);
  }

  @MessagePattern('createMenuItem')
  async createMenuItem(
    restaurantId: number,
    menuItem: CreateMenuItemDto,
  ): Promise<MenuItem> {
    return await this.menuItemService.createMenuItem(restaurantId, menuItem);
  }

  @MessagePattern('updateMenuItem')
  async updateMenuItem(
    id: number,
    menuItem: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    return await this.menuItemService.updateMenuItem(id, menuItem);
  }

  @MessagePattern('deleteMenuItem')
  async deleteMenuItem(id: number): Promise<DeleteResult> {
    return await this.menuItemService.deleteMenuItem(id);
  }
}
