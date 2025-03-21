import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { MenuItem } from './menu_item';

@ApiSchema({
  name: 'OrderItemResponse',
})
export class OrderItem {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 1,
  })
  count: number;

  @ApiProperty({
    type: () => MenuItem,
  })
  menuItem: MenuItem;

  @ApiProperty({
    example: 100,
  })
  price: number;
}
