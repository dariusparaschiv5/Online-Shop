import { Order } from 'src/orders/domain/order.domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.enum';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'firstName',
  })
  firstName: string;

  @Column({
    default: 'lastName',
  })
  lastName: string;

  @Column({
    nullable: false,
    default: 'username',
  })
  username: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    default: 'emailAdress',
  })
  emailAdress: string;

  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  role: Role;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
