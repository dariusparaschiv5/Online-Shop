import { Customer } from 'src/customers/domain/customer.domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'CreatedAt',
    default: () => `'0001-01-01T00:00:00Z'::timestamptz`,
  })
  createdAt: Date;

  @Column({
    name: 'Adress.Country',
    default: 'country',
  })
  country: string;

  @Column({
    name: 'Adress.City',
    default: 'city',
  })
  city: string;

  @Column({
    name: 'Adress.County',
    default: 'county',
  })
  county: string;

  @Column({
    name: 'Adress.StreetAdress',
    default: 'streetAdress',
  })
  streetAdress: string;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'CustomerId' })
  customer: Customer;
}
