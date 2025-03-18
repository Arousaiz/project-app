import { Address } from './address';
import { MenuItem } from './menu_item';

export class Restaurant {
  id: number;
  name: string;
  cuisine: string;
  phone: string;
  operatingHours: string;
  rating: number;
  address: Address;
  menuItems: MenuItem[];
}

