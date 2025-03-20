import { Type } from 'class-transformer';
import { CreateAddressDto } from './create_address.dto';
import {
  IsNotEmptyObject,
  IsInt,
  ValidateNested,
  IsPositive,
} from 'class-validator';

export class CreateDeliveryDetailsDto {
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  address: CreateAddressDto;

  @IsInt()
  @IsPositive()
  deliveryTime: number;
}
