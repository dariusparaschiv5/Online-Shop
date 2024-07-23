import { Customer } from 'src/customers/domain/customer.domain';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.domain';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: () => `'0001-01-01T00:00:00Z'::timestamptz`,
  })
  createdAt: Date;

  @Column({
    default: 'country',
  })
  country: string;

  @Column({
    default: 'city',
  })
  city: string;

  @Column({
    default: 'county',
  })
  county: string;

  @Column({
    default: 'streetAddress',
  })
  streetAdress: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
