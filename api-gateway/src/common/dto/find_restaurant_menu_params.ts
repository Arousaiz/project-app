import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindRestaurantMenuParams {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  menuId: string;
}
