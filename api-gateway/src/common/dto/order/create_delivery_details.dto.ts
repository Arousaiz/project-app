import { DeliveryStatus } from 'src/common/enum/delivery_status';
import { CreateAddressDto } from './create_address.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliveryDetailsDto {
  address: CreateAddressDto;
  @IsNumber()
  @IsNotEmpty()
  deliveryTime: number;
}
