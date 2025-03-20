import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrderInterface } from 'src/common/interfaces/create_order.interface';
import { UpdateOrderInterface } from 'src/common/interfaces/update_order.interface';
import { OrderService } from 'src/services/order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('findAllOrders')
  async findAllOrders() {
    return await this.orderService.findAllOrders();
  }

  @MessagePattern('findOrderById')
  async findOrderById(id: string) {
    return await this.orderService.findOrderById(id);
  }

  @MessagePattern('findOrdersByUserId')
  async findOrdersByUserId(userId: string) {
    return await this.orderService.findOrdersByUserId(userId);
  }

  @MessagePattern('findOrdersByRestaurantId')
  async findOrdersByRestaurantId(restaurantId: string) {
    return await this.orderService.findOrdersByRestaurantId(restaurantId);
  }

  @MessagePattern('createOrder')
  async createOrder(order: CreateOrderInterface) {
    return await this.orderService.createOrder(order);
  }

  @MessagePattern('updateOrder')
  async updateOrder(id: string, data: UpdateOrderInterface) {
    return await this.orderService.updateOrder(id, data);
  }

  @MessagePattern('cancelOrder')
  async cancelOrder(id: string) {
    return await this.orderService.cancelOrder(id);
  }
}
