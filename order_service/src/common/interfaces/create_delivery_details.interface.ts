import { DeliveryStatus } from 'src/entity/delivery_details.entity';
import { CreateAddressDto } from './create_address.interface';

export interface CreateDeliveryDetailsDto {
  address: CreateAddressDto;
  deliveryStatus: DeliveryStatus;
  deliveryTime: number;
}
