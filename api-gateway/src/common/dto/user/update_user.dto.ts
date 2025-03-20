import {
  IsDefined,
  IsEmail,
  IsOptional,
  Length,
  ValidateIf,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(6, 50)
  firstName?: string;

  @IsOptional()
  @Length(6, 50)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @ValidateIf(
    (obj: UpdateUserDto) => !obj.firstName && !obj.lastName && !obj.email,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
