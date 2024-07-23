import { Order } from 'src/orders/domain/order.domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
