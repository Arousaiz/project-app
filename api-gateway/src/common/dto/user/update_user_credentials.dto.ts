import { IsNotEmpty, IsOptional, IsStrongPassword, Length,} from "class-validator";

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
    minSymbols: 1,})
  password?: string;
}
