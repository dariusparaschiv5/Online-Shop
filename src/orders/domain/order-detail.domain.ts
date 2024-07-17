import { Product } from 'src/products/domain/product.domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders.domain';
import { Location } from 'src/products/domain/location.domain';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid', { name: 'OrdersId' })
  ordersId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'ProductId' })
  productId: string;

  @Column({
    name: 'Quantity',
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Orders, (orders) => orders.id)
  @JoinColumn({ name: 'OrdersId' })
  order: Orders;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;
}
