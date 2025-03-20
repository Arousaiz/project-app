import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { DeliveryDetails } from './delivery_details.entity';
import { OrderItem } from './order_item.entity';
import { Restaurant } from './restaurant.entity';
import { OrderStatus } from 'src/common/enum/order_status';
import { PaymentMethod } from 'src/common/enum/payment_method';

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true })
  discount: number;

  @Column({ type: 'enum', enum: PaymentMethod, nullable: false })
  paymentMethod: PaymentMethod;

  @Column({ type: 'enum', enum: OrderStatus, nullable: false })
  orderStatus: OrderStatus;

  @Column({ type: 'int', nullable: false })
  orderTime: number;

  @OneToOne(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.order, {
    cascade: true,
  })
  deliveryDetails: DeliveryDetails;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItem[];

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;
}
export { OrderStatus, PaymentMethod };
