import { MenuItem } from './menuItem';

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

export class Address {
  id: number;
  city: string;
  street: string;
  house: string;
}
