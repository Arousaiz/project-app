import { OrderStatus, PaymentMethod } from 'src/entity/order.entity';
import { UpdateDeliveryDetailsDto } from './update_delivery_details.dto';

export interface UpdateOrderDto {
  paymentMethod: PaymentMethod;
  orderStatus: OrderStatus;
  deliveryDetails: UpdateDeliveryDetailsDto;
}
