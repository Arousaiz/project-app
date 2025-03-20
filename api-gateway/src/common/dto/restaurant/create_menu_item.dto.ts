import { IsInt, IsNumber, IsOptional, Length } from 'class-validator';

export class CreateMenuItemDto {
  @IsInt()
  restaurantId: number;

  @IsInt()
  categoryId: number;

  @Length(5, 100)
  name: string;

  @IsOptional()
  @Length(5, 255)
  description?: string;

  @IsNumber()
  price: number;
}
