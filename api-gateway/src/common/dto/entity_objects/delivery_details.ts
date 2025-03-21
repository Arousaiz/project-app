import { DeliveryStatus } from 'src/common/enum/delivery_status';
import { Address } from './address';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'DeliveryDetailsResponse',
})
export class DeliveryDetails {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    type: () => Address,
  })
  address: Address;

  @ApiProperty({
    example: 100,
  })
  deliveryTime: number;

  @ApiProperty({
    enum: DeliveryStatus,
    example: DeliveryStatus.AWAITING_CONFIRMATION,
  })
  deliveryStatus: DeliveryStatus;
}
