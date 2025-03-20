import { Injectable, Logger } from '@nestjs/common';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from 'src/common/dto/order/create_order.dto';
import { UpdateOrderDto } from 'src/common/dto/order/update_order.dto';
import { firstValueFrom } from 'rxjs';
import { Order } from '../common/dto/entity_objects/order';

@Injectable()
export class OrderService {
  constructor(
    private logger = new Logger('Order Service'),
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
      this.logger.log('Orders fetched successfully');
      return { message: 'Orders fetched successfully', data: orders };
    } catch (error) {
      this.logger.error('failed to fetch orders', error.stack);
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
      this.logger.log(
        `Orders in restaurant with id ${id} fetched successfully`,
      );
      return { message: 'Orders fetched successfully', data: orders };
    } catch (error) {
      this.logger.error(
        `failed to fetch orders in restaurant with id: ${id}`,
        error.stack,
      );
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
      this.logger.log(`Orders of user with id ${userId} fetched successfully`);
      return { message: 'Orders fetched successfully', data: orders };
    } catch (error) {
      this.logger.error(
        `failed to fetch orders of user with id: ${userId}`,
        error.stack,
      );
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
      this.logger.log(`User order with id ${id} fetched successfully`);
      return { message: 'Order fetched successfully', data: order };
    } catch (error) {
      this.logger.error(
        `failed to fetch user order with id: ${id}`,
        error.stack,
      );
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
      this.logger.log(`Order with id ${id} fetched successfully`);
      return { message: 'Order fetched successfully', data: order };
    } catch (error) {
      this.logger.error(`failed to fetch order with id: ${id}`, error.stack);
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
      this.logger.log(
        `Order for user with id ${newOrder.userId} created successfully`,
      );
      return { message: 'Order created successfully', data: order };
    } catch (error) {
      this.logger.error(
        `failed to create order, order details: ${JSON.stringify(newOrder)}`,
        error.stack,
      );
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
      this.logger.log(`Order with id ${id} updated successfully`);
      return { message: 'Order updated successfully', data: order };
    } catch (error) {
      this.logger.error(
        `failed to update order with id: ${id}, updating fields: ${JSON.stringify(updateOrder)}`,
        error.stack,
      );
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
      this.logger.log(`Order with id ${id} canceled successfully`);
      return { message: 'Order canceled successfully', data: order };
    } catch (error) {
      this.logger.error(`failed to cancel order with id ${id}`, error.stack);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
