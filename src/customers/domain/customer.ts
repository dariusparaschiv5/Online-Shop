import { Orders } from 'src/orders/domain/orders';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'FirstName',
    default: 'firstName',
  })
  firstName: string;

  @Column({
    name: 'LastName',
    default: 'lastName',
  })
  lastName: string;

  @Column({
    name: 'Username',
    nullable: false,
    default: 'username',
  })
  username: string;

  @Column({
    name: 'Password',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    name: 'EmailAdress',
    default: 'emailAdress',
  })
  emailAdress: string;

  @OneToMany(() => Orders, (orders) => orders.customer)
  orders: Orders[];
}
