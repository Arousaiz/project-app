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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get('orders')
  async getOrders() {
    return await this.orderService.getOrders();
  }

  @ApiOperation({ summary: 'Get orders by restaurant id' })
  @Get('restaurants/:id/orders/')
  async getOrdersByRestaurantId(@Param('id') { id }: FindOneParams) {
    return await this.orderService.getOrdersByRestaurantId(id);
  }

  @ApiOperation({ summary: 'Get orders by user id' })
  @UseGuards(AuthGuard)
  @Get('profile/orders')
  async getOrdersByUserId(@Request() req) {
    return await this.orderService.getOrdersByUserId(req.user.userId);
  }

  @ApiOperation({ summary: 'Get order for user by id' })
  //TODO check if order userId is the same as the logged in user
  @Get('profile/orders/:id')
  async getOrderById(@Param('id') { id }: FindOneParams) {
    return await this.orderService.getOrderById(id);
  }

  @ApiOperation({ summary: 'Get order by id for admin' })
  // admin only
  @Get('orders/:id')
  async getOrderByIdForAdmin(@Param('id') { id }: FindOneParams) {
    return await this.orderService.getOrderByIdForAdmin(id);
  }

  @ApiOperation({ summary: 'Create new order' })
  @Post('orders')
  async createOrder(@Body() newOrder: CreateOrderDto) {
    return await this.orderService.createOrder(newOrder);
  }

  @ApiOperation({ summary: 'Update order info' })
  @Put('orders/:id')
  async updateOrder(
    @Param('id') { id }: FindOneParams,
    @Body() updateOrder: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(id, updateOrder);
  }

  @ApiOperation({ summary: 'Cancel order' })
  @Put('orders/:id/cancel')
  async cancelOrder(@Param('id') { id }: FindOneParams) {
    return await this.orderService.cancelOrder(id);
  }
}
