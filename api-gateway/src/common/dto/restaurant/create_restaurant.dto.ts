import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsUUID, Length } from 'class-validator';

@ApiSchema({ name: 'CreateRestaurantRequest' })
export class CreateRestaurantDto {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  addressId: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Burger King',
  })
  @Length(5, 100)
  name: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 100,
    example: 'Fast food',
  })
  @Length(5, 100)
  cuisine: string;

  @ApiProperty({
    required: true,
    example: '+375291234567',
    minLength: 13,
    maxLength: 13,
  })
  @IsPhoneNumber('BY')
  phone: string;

  @ApiProperty({
    required: true,
    minLength: 5,
    maxLength: 255,
    example: '10:00 - 22:00',
  })
  @Length(5, 255)
  @IsNotEmpty()
  operatingHours: string;
}
