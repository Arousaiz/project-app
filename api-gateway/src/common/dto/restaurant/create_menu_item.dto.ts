import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateMenuItemDto {
  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @Length(5, 100)
  name: string;

  @IsOptional()
  @Length(5, 255)
  description?: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
