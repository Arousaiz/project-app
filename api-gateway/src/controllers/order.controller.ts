import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateOrderDto } from 'src/common/dto/order/create_order.dto';
import { UpdateOrderDto } from 'src/common/dto/order/update_order.dto';
import { firstValueFrom } from 'rxjs';
import { Order } from '../common/dto/entity_objects/order';
import { FindOneParams } from 'src/common/dto/find_one_params';

@Controller()
export class OrderController {
  constructor(
    @Inject('ORDER_SERVICE') private orderServiceClient: ClientProxy,
    @Inject('RESTAURANT_SERVICE') private restaurantServiceClient: ClientProxy,
    @Inject('USER_SERVICE') private userServiceClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authServiceClient: ClientProxy,
  ) {}

  @Get('orders')
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

  @Get('restaurants/:id/orders/')
  async getOrdersByRestaurantId(@Param('id') { id }: FindOneParams) {
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

  @UseGuards(AuthGuard)
  @Get('profile/orders')
  async getOrdersByUserId(@Request() req) {
    try {
      const userId: number = req.user.userId;
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

  //TODO check if order userId is the same as the logged in user
  @Get('profile/orders/:id')
  async getOrderById(@Param('id') { id }: FindOneParams) {
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

  // admin only
  @Get('orders/:id')
  async getOrderByIdForAdmin(@Param('id') { id }: FindOneParams) {
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

  @Post('orders')
  async createOrder(@Body() newOrder: CreateOrderDto) {
    try {
      const menuItemIds: number[] = newOrder.orderItems.map(
        (item) => item.menuItemId,
      );
      const orderItemsPrices: Map<number, number> = await firstValueFrom(
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

  @Put('orders/:id')
  async updateOrder(
    @Param('id') { id }: FindOneParams,
    @Body() updateOrder: UpdateOrderDto,
  ) {
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

  @Put('orders/:id/cancel')
  async cancelOrder(@Param('id') { id }: FindOneParams) {
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
