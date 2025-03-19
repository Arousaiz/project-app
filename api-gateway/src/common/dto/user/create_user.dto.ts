import {
  IsStrongPassword,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,})
  password: string;
  @Length(6, 50)
  username: string;
}
