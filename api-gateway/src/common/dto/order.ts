import { MenuItem } from './menuItem';

export class Order {
  id: number;
  price: number;
  discount: number;
  paymentMethod: string;
  orderStatus: string;
  orderTime: number;
  deliveryDetails: DeliveryDetails;
  orderItems: OrderItem[];
}

export class DeliveryDetails {
  id: number;
  address: string;
  deliveryTime: number;
  deliveryStatus: string;
}

export class OrderItem {
  id: number;
  quantity: number;
  menuItem: MenuItem;
}
