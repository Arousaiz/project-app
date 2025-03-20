import {
  IsDefined,
  IsOptional,
  IsStrongPassword,
  Length,
  ValidateIf,
} from 'class-validator';

export class UpdateUserCredentialsDto {
  @IsOptional()
  @Length(6, 50)
  username?: string;

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
