import { Product } from 'src/products/domain/product.domain';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.domain';
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

  @ManyToOne(() => Order, (orders) => orders.id)
  @JoinColumn({ name: 'OrdersId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'ProductId' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;
}
