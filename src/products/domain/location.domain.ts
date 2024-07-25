import { OrderDetail } from '../../orders/domain/order-detail.domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'name',
  })
  name: string;

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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];
}
