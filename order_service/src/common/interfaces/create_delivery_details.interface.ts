import { DeliveryStatus } from '../enum/delivery_status';
import { CreateAddressInterface } from './create_address.interface';

export interface CreateDeliveryDetailsInterface {
  address: CreateAddressInterface;
  deliveryStatus: DeliveryStatus;
  deliveryTime: number;
}
