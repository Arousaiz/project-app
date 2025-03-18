import { OrderStatus } from '../enum/order_status';
import { PaymentMethod } from '../enum/payment_method';
import { CreateDeliveryDetailsInterface } from './create_delivery_details.interface';
import { CreateOrderItemInterface } from './create_order_item.interface';

export interface CreateOrderInterface {
  userId: number;
  restaurantId: number;
  paymentMethod: PaymentMethod;
  orderTime: number;
  orderStatus: OrderStatus;
  orderItems: CreateOrderItemInterface[];
  deliveryDetails: CreateDeliveryDetailsInterface;
}
