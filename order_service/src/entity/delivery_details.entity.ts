import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Address } from './address.entity';
import { Order } from './order.entity';

export enum DeliveryStatus {
  ORDERED = 'ordered',
  IN_TRANSIT = 'in transit',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
}

@Entity('delivery_details')
export class DeliveryDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    nullable: false,
    default: DeliveryStatus.ORDERED,
  })
  deliveryStatus: DeliveryStatus;

  @Column({ type: 'int', nullable: false })
  deliveryTime: number;

  @ManyToOne(() => Address, (address) => address.deliveryDetails)
  address: Address;

  @OneToOne(() => Order, (order) => order.deliveryDetails)
  order: Order;
}
