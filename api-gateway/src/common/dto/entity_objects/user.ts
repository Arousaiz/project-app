import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'UserResponse',
})
export class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 'Johnathan',
  })
  firstName: string;

  @ApiProperty({
    example: 'Bartlett',
  })
  lastName: string;

  @ApiProperty({
    example: '7Hs9o@example.com',
  })
  email: string;

  @ApiProperty({
    example: 'PapaSmurf',
  })
  username: string;

  @ApiProperty({
    example: '+375291234567',
  })
  contactNumber: string;
}
