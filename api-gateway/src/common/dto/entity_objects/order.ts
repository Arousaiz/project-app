import { OrderStatus } from 'src/common/enum/order_status';
import { DeliveryDetails } from './delivery_details';
import { OrderItem } from './order_item';
import { PaymentMethod } from 'src/common/enum/payment_method';
import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'OrderResponse',
})
export class Order {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  id: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  userId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  restaurantId: string;

  @ApiProperty({
    example: 100,
  })
  price: number;

  @ApiProperty({
    example: 10,
  })
  discount: number;

  @ApiProperty({
    enum: PaymentMethod,
  })
  paymentMethod: PaymentMethod;

  @ApiProperty({
    enum: OrderStatus,
  })
  orderStatus: OrderStatus;

  @ApiProperty({
    example: 12345678,
  })
  orderTime: number;

  @ApiProperty({
    type: () => DeliveryDetails,
  })
  deliveryDetails: DeliveryDetails;

  @ApiProperty({
    type: () => [OrderItem],
  })
  orderItems: OrderItem[];
}
