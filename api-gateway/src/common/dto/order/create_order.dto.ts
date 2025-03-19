import { CreateDeliveryDetailsDto } from './create_delivery_details.dto';
import { CreateOrderItemDto } from './create_order_item.dto';
import { ArrayNotEmpty, IsEnum, IsInt, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  userId: number;
  @IsInt()
  restaurantId: number;
  @IsInt()
  orderTime: number;
  @ArrayNotEmpty()
  orderItems: CreateOrderItemDto[];
  deliveryDetails: CreateDeliveryDetailsDto;
}
