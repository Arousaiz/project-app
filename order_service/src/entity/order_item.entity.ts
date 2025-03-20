import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { MenuItem } from './menu_item.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: false })
  menuItemId: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  count: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderItems)
  menuItem: MenuItem;
}
