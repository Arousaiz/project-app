import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsStrongPassword, Length } from 'class-validator';

@ApiSchema({
  name: 'CreateUserRequest',
})
export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'MoonLight!1',
  })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    required: true,
    example: 'PapaSmurf',
  })
  @Length(6, 50)
  username: string;
}
