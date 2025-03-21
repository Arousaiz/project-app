import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'CategoryResponse',
})
export class Category {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 'Burgers',
  })
  name: string;

  @ApiProperty({
    example: 'Burgers',
  })
  description: string;
}
