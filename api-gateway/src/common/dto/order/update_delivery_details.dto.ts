import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { DeliveryStatus } from 'src/common/enum/delivery_status';

export class UpdateDeliveryDetailsDto {
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus?: DeliveryStatus;

  @IsOptional()
  @IsInt()
  @IsPositive()
  deliveryTime?: number;

  @ValidateIf(
    (obj: UpdateDeliveryDetailsDto) => !obj.deliveryStatus && !obj.deliveryTime,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
