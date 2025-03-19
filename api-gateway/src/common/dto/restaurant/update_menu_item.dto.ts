import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateMenuItemDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
