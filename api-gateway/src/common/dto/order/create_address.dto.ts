import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

@ApiSchema({ name: 'CreateAddressRequest' })
export class CreateAddressDto {
  @ApiProperty({
    required: false,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty({
    required: true,
    example: 'Minsk',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    required: true,
    example: 'Pushkina',
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({
    required: true,
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  house: number;
}
