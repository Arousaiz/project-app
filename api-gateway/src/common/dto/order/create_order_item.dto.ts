import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';

@ApiSchema({ name: 'CreateOrderItemRequest' })
export class CreateOrderItemDto {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  menuItemId: string;

  @ApiProperty({
    required: false,
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @ApiProperty({
    required: true,
    example: 1,
    minimum: 1,
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  count: number;
}
