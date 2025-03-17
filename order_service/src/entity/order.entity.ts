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

export enum OrderStatus {
  PLACED = 'placed',
  ACCEPTED = 'accepted',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  RETURNED = 'returned',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  ONLINE = 'online',
}

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

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

  userId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant: Restaurant;
}
