import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'FavoritesResponse',
})
export class Favorites {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  menuItemId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  restaurantId: string;

  @ApiProperty({
    example: 12345678,
  })
  dateAdded: number;
}
