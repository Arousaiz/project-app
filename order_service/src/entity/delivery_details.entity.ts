import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Address } from './address.entity';
import { Order } from './order.entity';
import { DeliveryStatus } from 'src/common/enum/delivery_status';

@Entity('delivery_details')
export class DeliveryDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
    nullable: false,
    default: DeliveryStatus.AWAITING_CONFIRMATION,
  })
  deliveryStatus: DeliveryStatus;

  @Column({ type: 'int', nullable: false })
  deliveryTime: number;

  @ManyToOne(() => Address, (address) => address.deliveryDetails)
  address: Address;

  @OneToOne(() => Order, (order) => order.deliveryDetails)
  order: Order;
}
