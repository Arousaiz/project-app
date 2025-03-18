import { OrderStatus } from 'src/common/enum/order_status';
import { DeliveryDetails } from './delivery_details';
import { OrderItem } from './order_item';
import { PaymentMethod } from 'src/common/enum/payment_method';

export class Order {
  id: number;
  price: number;
  discount: number;
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  orderTime: number;
  deliveryDetails: DeliveryDetails;
  orderItems: OrderItem[];
}
