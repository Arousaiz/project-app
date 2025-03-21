import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

@ApiSchema({ name: 'UpdateMenuItemRequest' })
export class UpdateMenuItemDto {
  @ApiProperty({
    required: false,
    example: 'Burger',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    required: false,
    example: 'Beef and cheese',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    example: 100,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    required: false,
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
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
