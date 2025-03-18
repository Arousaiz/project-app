import { PaymentMethod } from 'src/common/enum/payment_method';
import { CreateDeliveryDetailsDto } from './create_delivery_details.dto';
import { CreateOrderItemDto } from './create_order_item.dto';
import { OrderStatus } from 'src/common/enum/order_status';

export interface CreateOrderDto {
  userId: number;
  restaurantId: number;
  paymentMethod: PaymentMethod;
  orderTime: number;
  orderStatus: OrderStatus;
  orderItems: CreateOrderItemDto[];
  deliveryDetails: CreateDeliveryDetailsDto;
}
