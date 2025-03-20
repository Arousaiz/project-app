import { Type } from 'class-transformer';
import { CreateDeliveryDetailsDto } from './create_delivery_details.dto';
import { CreateOrderItemDto } from './create_order_item.dto';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsInt()
  @IsPositive()
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
