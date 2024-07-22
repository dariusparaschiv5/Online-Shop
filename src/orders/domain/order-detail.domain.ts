import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.domain';
import { Product } from 'src/products/domain/product.domain';
import { Location } from 'src/products/domain/location.domain';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'ordersId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Location, (location) => location.orderDetails)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column()
  quantity: number;
}
