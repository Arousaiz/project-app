import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/common/dto/order/create_order.dto';
import { UpdateOrderDto } from 'src/common/dto/order/update_order.dto';
import { firstValueFrom } from 'rxjs';
import { Order } from '../common/dto/entity_objects/order';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_SERVICE') private orderServiceClient: ClientProxy,
    @Inject('RESTAURANT_SERVICE') private restaurantServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  async getOrders() {
    try {
      const orders: Order[] = await firstValueFrom(
        this.orderServiceClient.send('findAllOrders', {}),
      );
      if (!orders)
        throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
      return { message: 'Orders fetched successfully', data: orders };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrdersByRestaurantId(id: string) {
    try {
      const orders: Order[] = await firstValueFrom(
        this.orderServiceClient.send('findOrdersByRestaurantId', id),
      );
      if (!orders)
        throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
      return { message: 'Orders fetched successfully', data: orders };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrdersByUserId(userId: string) {
    try {
      const orders: Order[] = await firstValueFrom(
        this.orderServiceClient.send('findOrdersByUserId', userId),
      );
      if (!orders)
        throw new HttpException('Orders not found', HttpStatus.NOT_FOUND);
      return { message: 'Orders fetched successfully', data: orders };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrderById(id: string) {
    try {
      const order: Order = await firstValueFrom(
        this.orderServiceClient.send('findOrderById', id),
      );
      if (!order)
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      return { message: 'Order fetched successfully', data: order };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrderByIdForAdmin(id: string) {
    try {
      const order: Order = await firstValueFrom(
        this.orderServiceClient.send('findOrderById', id),
      );
      if (!order)
        throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
      return { message: 'Order fetched successfully', data: order };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrder(newOrder: CreateOrderDto) {
    try {
      const menuItemIds: string[] = newOrder.orderItems.map(
        (item) => item.menuItemId,
      );
      const orderItemsPrices: Map<string, number> = await firstValueFrom(
        this.orderServiceClient.send('getMenuItemPricesByIds', menuItemIds),
      );
      newOrder.orderItems.forEach(
        (item) => (item.price = orderItemsPrices.get(item.menuItemId)!),
      );
      const order: Order = await firstValueFrom(
        this.orderServiceClient.send('createOrder', newOrder),
      );
      if (!order)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return { message: 'Order created successfully', data: order };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOrder(id: string, updateOrder: UpdateOrderDto) {
    try {
      const order: Order = await firstValueFrom(
        this.orderServiceClient.send('updateOrder', { id, updateOrder }),
      );
      if (!order)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return { message: 'Order updated successfully', data: order };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async cancelOrder(id: string) {
    try {
      const order: Order = await firstValueFrom(
        this.orderServiceClient.send('cancelOrder', id),
      );
      if (!order)
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      return { message: 'Order canceled successfully', data: order };
    } catch {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
