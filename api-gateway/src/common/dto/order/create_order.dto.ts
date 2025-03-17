import { OrderStatus, PaymentMethod } from 'src/entity/order.entity';
import { CreateDeliveryDetailsDto } from './create_delivery_details.dto';
import { CreateOrderItemDto } from './create_order_item.dto';

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
