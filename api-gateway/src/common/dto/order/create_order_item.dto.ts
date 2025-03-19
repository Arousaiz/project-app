import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateOrderItemDto {
  @IsInt()
  menuItemId: number;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsNumber()
  count: number;
}
