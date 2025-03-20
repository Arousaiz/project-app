import { Type } from 'class-transformer';
import { CreateDeliveryDetailsDto } from './create_delivery_details.dto';
import { CreateOrderItemDto } from './create_order_item.dto';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsInt()
  restaurantId: number;

  @IsInt()
  orderTime: number;

  @ArrayNotEmpty()
  @Type(() => CreateOrderItemDto)
  @ValidateNested()
  orderItems: CreateOrderItemDto[];

  @IsNotEmptyObject()
  @Type(() => CreateDeliveryDetailsDto)
  @ValidateNested()
  deliveryDetails: CreateDeliveryDetailsDto;
}
