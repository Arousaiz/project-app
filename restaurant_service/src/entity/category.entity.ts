import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MenuItem } from './menu_item.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.category)
  menuItems: MenuItem[];
}
