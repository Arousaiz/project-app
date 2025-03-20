import {
  IsDefined,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  cuisine?: string;
  @IsOptional()
  @IsPhoneNumber('BY')
  phone?: string;
  @IsOptional()
  @IsString()
  operatingHours?: string;

  @ValidateIf(
    (o: UpdateRestaurantDto) =>
      !o.name && !o.cuisine && !o.phone && !o.operatingHours,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
