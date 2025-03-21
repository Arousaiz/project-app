import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDefined,
  IsOptional,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';

@ApiSchema({ name: 'UpdateUserCredentialsRequest' })
export class UpdateUserCredentialsDto {
  @ApiProperty({
    required: false,
    example: 'PapaSmurf',
  })
  @IsOptional()
  @Length(6, 50)
  username?: string;

  @ApiProperty({
    required: false,
    example: 'MoonLight!1',
  })
  @IsOptional()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password?: string;

  @ValidateIf((obj: UpdateUserCredentialsDto) => !obj.username && !obj.password)
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
