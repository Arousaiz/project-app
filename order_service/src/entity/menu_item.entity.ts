import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { OrderItem } from './order_item.entity';

@Entity('menu_item')
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  categoryId: number;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems, {})
  restaurant: Restaurant;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.menuItem, {})
  orderItems: OrderItem[];
}
