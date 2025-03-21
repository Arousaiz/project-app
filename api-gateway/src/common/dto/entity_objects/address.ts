import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'AddressResponse',
})
export class Address {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: 'Minsk',
  })
  city: string;

  @ApiProperty({
    example: 'Pushkina',
  })
  street: string;

  @ApiProperty({
    example: '1',
  })
  house: string;
}
