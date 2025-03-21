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
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateOrderRequest' })
export class CreateOrderDto {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({
    required: true,
    example: 200000,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  orderTime: number;

  @ApiProperty({
    required: true,
    type: () => [CreateOrderItemDto],
  })
  @ArrayNotEmpty()
  @Type(() => CreateOrderItemDto)
  @ValidateNested()
  orderItems: CreateOrderItemDto[];

  @ApiProperty({
    required: true,
    type: () => CreateDeliveryDetailsDto,
  })
  @IsNotEmptyObject()
  @Type(() => CreateDeliveryDetailsDto)
  @ValidateNested()
  deliveryDetails: CreateDeliveryDetailsDto;
}
