import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DeliveryDetails } from './delivery_details.entity';
import { Restaurant } from './restaurant.entity';
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

  @OneToMany(
    () => DeliveryDetails,
    (deliveryDetails) => deliveryDetails.address,
  )
  deliveryDetails: DeliveryDetails[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.address)
  restaurants: Restaurant[];
}
