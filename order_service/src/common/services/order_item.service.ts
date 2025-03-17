import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderItemDto } from 'src/common/interfaces/create_order_item.interface';
import { OrderItem } from 'src/entity/order_item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
  ) {}

  async createOrderItem(
    orderId: number,
    orderItem: CreateOrderItemDto,
  ): Promise<OrderItem> {
    const item = this.orderItemsRepository.create({
      order: { id: orderId },
      menuItemId: orderItem.menuItemId,
      price: orderItem.price,
      count: orderItem.count,
    });
    return this.orderItemsRepository.save(item);
  }
}
