import { Type } from 'class-transformer';
import { CreateAddressDto } from './create_address.dto';
import { IsNotEmptyObject, IsNumber, ValidateNested } from 'class-validator';

export class CreateDeliveryDetailsDto {
  @IsNotEmptyObject()
  @Type(() => CreateAddressDto)
  @ValidateNested()
  address: CreateAddressDto;

  @IsNumber()
  deliveryTime: number;
}
