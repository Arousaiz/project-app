import { DeliveryStatus } from "src/common/enum/delivery_status";
import { Address } from "./address";

export class DeliveryDetails {
    id: number;
    address: Address;
    deliveryTime: number;
    deliveryStatus: DeliveryStatus;
  }
  