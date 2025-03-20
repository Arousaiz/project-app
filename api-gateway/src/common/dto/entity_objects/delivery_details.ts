import { DeliveryStatus } from 'src/common/enum/delivery_status';
import { Address } from './address';

export class DeliveryDetails {
  id: string;
  address: Address;
  deliveryTime: number;
  deliveryStatus: DeliveryStatus;
}
