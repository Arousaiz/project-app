import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  cuisine?: string;
  @IsOptional()
  @IsPhoneNumber('BY')
  phone?: string;
  @IsOptional()
  @IsString()
  operatingHours?: string;
}
