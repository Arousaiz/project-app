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
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'UpdateOrderRequest' })
export class UpdateOrderDto {
  @ApiProperty({
    required: false,
    enum: PaymentMethod,
    example: PaymentMethod.CASH,
  })
  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @ApiProperty({
    required: false,
    enum: OrderStatus,
    example: OrderStatus.ACCEPTED,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus;

  @ApiProperty({
    required: false,
    type: () => UpdateDeliveryDetailsDto,
  })
  @IsOptional()
  @Type(() => UpdateDeliveryDetailsDto)
  @ValidateNested()
  deliveryDetails?: UpdateDeliveryDetailsDto;

  @ValidateIf(
    (obj: UpdateOrderDto) =>
      !obj.paymentMethod && !obj.orderStatus && !obj.deliveryDetails,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
