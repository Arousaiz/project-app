import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Order, OrderStatus } from '../../entity/order.entity';
import { CreateOrderDto } from 'src/common/interfaces/create_order.interface';
import { UpdateOrderDto } from 'src/common/interfaces/update_order.interface';
import { DeliveryDetailsService } from './delivery_details.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private deliveryDetailsService: DeliveryDetailsService,
  ) {}

  findAllOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  findOrderById(id: number): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  findOrdersByUserId(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({ where: { userId: userId } });
  }

  findOrdersByRestaurantId(restaurantId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  async createOrder(order: CreateOrderDto): Promise<Order> {
    const data = this.ordersRepository.create({
      userId: order.userId,
      restaurant: { id: order.restaurantId },
      discount: order.discount,
      price: order.price,
      paymentMethod: order.paymentMethod,
      orderTime: Date.now(),
      orderStatus: order.orderStatus,
      deliveryDetails: {
        deliveryStatus: order.deliveryDetails.deliveryStatus,
        deliveryTime: Date.now(),
        address: order.deliveryDetails.address,
      },
      orderItems: [
        ...order.orderItems.map((item) => {
          return {
            menuItemId: item.menuItemId,
            count: item.count,
            price: item.price,
          };
        }),
      ],
    });

    return this.ordersRepository.save(data);
  }

  async updateOrder(id: number, data: UpdateOrderDto): Promise<Order> {
    const order = await this.findOrderById(id);
    if (!order)
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    await this.deliveryDetailsService.updateDeliveryDetails(
      order.deliveryDetails.id,
      data.deliveryDetails,
    );
    return this.ordersRepository.save({
      id,
      paymentMethod: data.paymentMethod,
      orderStatus: data.orderStatus,
    });
  }

  cancelOrder(id: number): Promise<UpdateResult> {
    return this.ordersRepository.update(id, {
      orderStatus: OrderStatus.CANCELLED,
    });
  }

  deleteOrder(id: number): Promise<DeleteResult> {
    return this.ordersRepository.delete(id);
  }
}
