import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
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
  @IsUUID()
  categoryId?: string;

  @ValidateIf(
    (obj: UpdateMenuItemDto) =>
      !obj.name && !obj.description && !obj.price && !obj.categoryId,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
