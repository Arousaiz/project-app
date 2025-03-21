import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateIf,
} from 'class-validator';
import { DeliveryStatus } from 'src/common/enum/delivery_status';

@ApiSchema({ name: 'UpdateDeliveryDetailsRequest' })
export class UpdateDeliveryDetailsDto {
  @ApiProperty({
    required: false,
    enum: DeliveryStatus,
    example: DeliveryStatus.AWAITING_CONFIRMATION,
  })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus?: DeliveryStatus;

  @ApiProperty({
    required: false,
    example: 100,
    minimum: 1,
  })
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
