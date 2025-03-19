import { IsEnum, IsInt, IsOptional } from "class-validator";
import { DeliveryStatus } from "src/common/enum/delivery_status";

export class UpdateDeliveryDetailsDto {
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus?: DeliveryStatus;
  @IsOptional()
  @IsInt()
  deliveryTime?: number;
}
