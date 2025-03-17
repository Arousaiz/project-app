import { Controller } from '@nestjs/common';
import { OrderService } from 'src/common/services/order.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/common/interfaces/create_order.interface';
import { UpdateOrderDto } from 'src/common/interfaces/update_order.interface';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('findAllOrders')
  async findAllOrders() {
    return await this.orderService.findAllOrders();
  }

  @MessagePattern('findOrderById')
  async findOrderById(id: number) {
    return await this.orderService.findOrderById(id);
  }

  @MessagePattern('findOrdersByUserId')
  async findOrdersByUserId(userId: number) {
    return await this.orderService.findOrdersByUserId(userId);
  }

  @MessagePattern('findOrdersByRestaurantId')
  async findOrdersByRestaurantId(restaurantId: number) {
    return await this.orderService.findOrdersByRestaurantId(restaurantId);
  }

  @MessagePattern('createOrder')
  async createOrder(order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }

  @MessagePattern('updateOrder')
  async updateOrder(id: number, data: UpdateOrderDto) {
    return await this.orderService.updateOrder(id, data);
  }

  @MessagePattern('cancelOrder')
  async cancelOrder(id: number) {
    return await this.orderService.cancelOrder(id);
  }
}
