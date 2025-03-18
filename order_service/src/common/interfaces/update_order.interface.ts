import { OrderStatus } from '../enum/order_status';
import { PaymentMethod } from '../enum/payment_method';
import { UpdateDeliveryDetailsInterface } from './update_delivery_details.interface';

export interface UpdateOrderInterface {
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  deliveryDetails: UpdateDeliveryDetailsInterface;
}
