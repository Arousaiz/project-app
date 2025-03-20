import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateRestaurantDto {
  @IsUUID()
  @IsNotEmpty()
  addressId: string;

  @Length(5, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  cuisine: string;

  @IsPhoneNumber('BY')
  phone: string;

  @IsString()
  @IsNotEmpty()
  operatingHours: string;
}
