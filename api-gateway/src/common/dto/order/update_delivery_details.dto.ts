import { DeliveryStatus } from 'src/entity/delivery_details.entity';

export interface UpdateDeliveryDetailsDto {
  deliveryStatus: DeliveryStatus;
  deliveryTime: number;
}
