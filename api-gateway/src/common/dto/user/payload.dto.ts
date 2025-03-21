import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@ApiSchema({ name: 'payload' })
export class payloadDto {
  @ApiProperty({
    required: true,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    required: true,
    example: 'PapaSmurf',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
