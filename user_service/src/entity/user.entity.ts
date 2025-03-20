import { UserRole } from 'src/common/enum/user_roles';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// TODO: add favorites
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  addressId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 13, nullable: true })
  contactNumber: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  // length should'nt be 13
  @Column({ type: 'varchar', length: 13, nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  hashedPassword: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;
}
