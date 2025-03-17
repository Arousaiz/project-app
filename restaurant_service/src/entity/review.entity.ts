import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MenuItem } from './menu_item.entity';
import { User } from './user.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  text: string;

  @Column({ type: 'int', nullable: true })
  rating: number;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.reviews)
  menuItem: MenuItem;

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;
}
