import { PaymentMethod } from 'src/common/enum/payment_method';
import { UpdateDeliveryDetailsDto } from './update_delivery_details.dto';
import { OrderStatus } from 'src/common/enum/order_status';
import {
  IsDefined,
  IsEnum,
  IsOptional,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus;

  @IsOptional()
  @Type(() => UpdateDeliveryDetailsDto)
  @ValidateNested()
  deliveryDetails?: UpdateDeliveryDetailsDto;

  @ValidateIf(
    (o: UpdateOrderDto) =>
      !o.paymentMethod && !o.orderStatus && !o.deliveryDetails,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
