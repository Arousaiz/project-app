import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  Length,
  ValidateIf,
} from 'class-validator';

@ApiSchema({ name: 'UpdateUserRequest' })
export class UpdateUserDto {
  @ApiProperty({
    required: false,
    example: 'Vanessa',
  })
  @IsOptional()
  @Length(6, 50)
  firstName?: string;

  @ApiProperty({
    required: false,
    example: 'Ferguson',
  })
  @IsOptional()
  @Length(6, 50)
  lastName?: string;

  @ApiProperty({
    required: false,
    example: '7Hs9o@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateIf(
    (obj: UpdateUserDto) => !obj.firstName && !obj.lastName && !obj.email,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
