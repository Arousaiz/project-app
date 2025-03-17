import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from './category.entity';
import { Restaurant } from './restaurant.entity';
import { Review } from './review.entity';

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

  @ManyToOne(() => Category, (category) => category.menuItems)
  category: Category;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menuItems, {})
  restaurant: Restaurant;

  @ManyToOne(() => Review, (review) => review.menuItem, {})
  reviews: Review[];
}
