import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {
  @IsOptional()
  @IsInt()
  id?: number;
  @IsString()
  city: string;
  @IsString()
  street: string;
  @IsInt()
  house: number;
}
