import {  IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateMenuItemDto {
  @IsInt()
  restaurantId: number;
  @IsInt()
  categoryId: number;
  @IsString()
  @Length(5, 100)
  name: string;
  @IsOptional()
  @IsString()
  @Length(5, 255)
  description?: string;
  @IsNumber()
  price: number;
}
