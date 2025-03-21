import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDefined,
  IsOptional,
  IsPhoneNumber,
  Length,
  ValidateIf,
} from 'class-validator';

@ApiSchema({ name: 'UpdateRestaurantRequest' })
export class UpdateRestaurantDto {
  @ApiProperty({
    required: false,
    example: 'Burger King',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @Length(5, 100)
  name?: string;

  @ApiProperty({
    required: false,
    example: 'Fast food',
    minLength: 5,
    maxLength: 100,
  })
  @IsOptional()
  @Length(5, 100)
  cuisine?: string;

  @ApiProperty({
    required: false,
    example: '+375291234567',
  })
  @IsOptional()
  @IsPhoneNumber('BY')
  phone?: string;

  @ApiProperty({
    required: false,
    example: '8:00-22:00',
  })
  @IsOptional()
  @Length(5, 255)
  operatingHours?: string;

  @ValidateIf(
    (o: UpdateRestaurantDto) =>
      !o.name && !o.cuisine && !o.phone && !o.operatingHours,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
