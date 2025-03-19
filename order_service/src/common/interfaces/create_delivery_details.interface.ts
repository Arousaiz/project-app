import { CreateAddressInterface } from './create_address.interface';

export interface CreateDeliveryDetailsInterface {
  address: CreateAddressInterface;
  deliveryTime: number;
}
