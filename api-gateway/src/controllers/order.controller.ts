import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateOrderDto } from 'src/common/dto/order/create_order.dto';
import { UpdateOrderDto } from 'src/common/dto/order/update_order.dto';
import { FindOneParams } from 'src/common/dto/find_one_params';
import { OrderService } from 'src/services/order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('orders')
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @Get('restaurants/:id/orders/')
  async getOrdersByRestaurantId(@Param('id') { id }: FindOneParams) {
    return await this.orderService.getOrdersByRestaurantId(id);
  }

  @UseGuards(AuthGuard)
  @Get('profile/orders')
  async getOrdersByUserId(@Request() req) {
    return await this.orderService.getOrdersByUserId(req.user.userId);
  }

  //TODO check if order userId is the same as the logged in user
  @Get('profile/orders/:id')
  async getOrderById(@Param('id') { id }: FindOneParams) {
    return await this.orderService.getOrderById(id);
  }

  // admin only
  @Get('orders/:id')
  async getOrderByIdForAdmin(@Param('id') { id }: FindOneParams) {
    return await this.orderService.getOrderByIdForAdmin(id);
  }

  @Post('orders')
  async createOrder(@Body() newOrder: CreateOrderDto) {
    return await this.orderService.createOrder(newOrder);
  }

  @Put('orders/:id')
  async updateOrder(
    @Param('id') { id }: FindOneParams,
    @Body() updateOrder: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(id, updateOrder);
  }

  @Put('orders/:id/cancel')
  async cancelOrder(@Param('id') { id }: FindOneParams) {
    return await this.orderService.cancelOrder(id);
  }
}
