import { OrderStatus, PaymentMethod } from 'src/entity/order.entity';
import { CreateDeliveryDetailsDto } from './create_delivery_details.interface';
import { CreateOrderItemDto } from './create_order_item.interface';

export interface CreateOrderDto {
  userId: number;
  restaurantId: number;
  discount: number;
  price: number;
  paymentMethod: PaymentMethod;
  orderTime: number;
  orderStatus: OrderStatus;
  orderItems: CreateOrderItemDto[];
  deliveryDetails: CreateDeliveryDetailsDto;
}
