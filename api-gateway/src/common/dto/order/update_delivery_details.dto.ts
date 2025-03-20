import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { DeliveryStatus } from 'src/common/enum/delivery_status';

export class UpdateDeliveryDetailsDto {
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus?: DeliveryStatus;

  @IsOptional()
  @IsInt()
  deliveryTime?: number;

  @ValidateIf(
    (o: UpdateDeliveryDetailsDto) => !o.deliveryStatus && !o.deliveryTime,
  )
  @IsDefined()
  protected readonly atLeastOne: undefined;
}
