import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(6, 50)
  firstName?: string;
  @IsOptional()
  @IsString()
  @Length(6, 50)
  lastName?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
}
