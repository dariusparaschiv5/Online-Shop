import { Customer } from 'src/customers/domain/customer.domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './order-detail.domain';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'CreatedAt',
    default: () => `'0001-01-01T00:00:00Z'::timestamptz`,
  })
  createdAt: Date;

  @Column({
    name: 'Address.Country',
    default: 'country',
  })
  country: string;

  @Column({
    name: 'Address.City',
    default: 'city',
  })
  city: string;

  @Column({
    name: 'Address.County',
    default: 'county',
  })
  county: string;

  @Column({
    name: 'Address.StreetAdress',
    default: 'streetAddress',
  })
  streetAdress: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'CustomerId' })
  customer: Customer;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
