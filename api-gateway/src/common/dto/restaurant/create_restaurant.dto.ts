import { IsInt, IsNotEmpty, IsPhoneNumber, IsString, Length } from "class-validator";

export class CreateRestaurantDto {
  @IsInt()
  addressId: number;
  @IsString()
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
