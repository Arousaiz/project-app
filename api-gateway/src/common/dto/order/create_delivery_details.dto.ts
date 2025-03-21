import { Type } from 'class-transformer';
import { CreateAddressDto } from './create_address.dto';
import {
  IsNotEmptyObject,
  IsInt,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({ name: 'CreateDeliveryDetailsRequest' })
export class CreateDeliveryDetailsDto {
  @ApiProperty({
    required: true,
    type: () => CreateAddressDto,
  })
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  address: CreateAddressDto;

  @ApiProperty({
    required: true,
    example: 200000,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  deliveryTime: number;
}
