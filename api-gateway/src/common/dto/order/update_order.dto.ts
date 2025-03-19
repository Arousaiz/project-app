import { PaymentMethod } from 'src/common/enum/payment_method';
import { UpdateDeliveryDetailsDto } from './update_delivery_details.dto';
import { OrderStatus } from 'src/common/enum/order_status';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus;
  deliveryDetails?: UpdateDeliveryDetailsDto;
}
