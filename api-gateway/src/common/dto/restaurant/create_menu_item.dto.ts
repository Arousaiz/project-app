import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';

@ApiSchema({ name: 'CreateMenuItemRequest' })
export class CreateMenuItemDto {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Burger',
  })
  @Length(5, 100)
  name: string;

  @ApiProperty({
    required: false,
    minLength: 5,
    maxLength: 255,
    example: 'Beef and cheese',
  })
  @IsOptional()
  @Length(5, 255)
  description?: string;

  @ApiProperty({
    required: true,
    example: 100,
    minimum: 1,
  })
  @IsNumber()
  @IsPositive()
  price: number;
}
