import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { User } from './user.entity';
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  street: string;

  @Column({ type: 'int', width: 4, nullable: false })
  house: number;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.address)
  restaurants: Restaurant[];

  @OneToMany(() => User, (user) => user.address)
  user: User[];
}
