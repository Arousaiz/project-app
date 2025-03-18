import { DeliveryStatus } from "../enum/delivery_status";

export interface UpdateDeliveryDetailsInterface {
  deliveryStatus: DeliveryStatus;
  deliveryTime: number;
}
