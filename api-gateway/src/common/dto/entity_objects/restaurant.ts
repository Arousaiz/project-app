import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Address } from './address';
import { MenuItem } from './menu_item';

@ApiSchema({
  name: 'RestaurantResponse',
})
export class Restaurant {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 'Burger King',
  })
  name: string;

  @ApiProperty({
    example: 'Fast food',
  })
  cuisine: string;

  @ApiProperty({
    example: '+375291234567',
  })
  phone: string;

  @ApiProperty({
    example: '8:00-22:00',
  })
  operatingHours: string;

  @ApiProperty({
    example: 4.5,
  })
  rating: number;

  @ApiProperty({
    type: () => Address,
  })
  address: Address;

  @ApiProperty({
    type: () => [MenuItem],
  })
  menuItems: MenuItem[];
}
