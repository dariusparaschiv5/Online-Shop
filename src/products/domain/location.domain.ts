import { OrderDetail } from 'src/orders/domain/order-detail.domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'Name',
    default: 'name',
  })
  name: string;

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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
