import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'MenuItemResponse',
})
export class MenuItem {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  categoryId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  restaurantId: string;

  @ApiProperty({
    example: 'Burger',
  })
  name: string;

  @ApiProperty({
    example: 'Beef and cheese',
  })
  description: string;

  @ApiProperty({
    example: 100,
  })
  price: number;
}
