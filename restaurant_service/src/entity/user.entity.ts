import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Review } from './review.entity';
import { Address } from './address.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  RESTAURANT_ADMIN = 'restaurant_admin',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  contactNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 13, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  hashedPassword: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @ManyToOne(() => Address, (address) => address.user)
  address: Address;
}
