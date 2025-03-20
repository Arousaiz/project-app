import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

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

  @ValidateIf(
    (o: UpdateMenuItemDto) =>
      !o.name && !o.description && !o.price && !o.categoryId,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
