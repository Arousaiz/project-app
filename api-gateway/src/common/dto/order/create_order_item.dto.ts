import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID()
  @IsNotEmpty()
  menuItemId: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsInt()
  @Min(1)
  count: number;
}
