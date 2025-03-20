import { Address } from './address';
import { MenuItem } from './menu_item';

export class Restaurant {
  id: string;
  name: string;
  cuisine: string;
  phone: string;
  operatingHours: string;
  rating: number;
  address: Address;
  menuItems: MenuItem[];
}
