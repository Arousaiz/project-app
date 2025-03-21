import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'ReviewResponse',
})
export class Review {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 5,
  })
  rating: number;

  @ApiProperty({
    example: 'Good',
  })
  text: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  menuItemId: string;
}
