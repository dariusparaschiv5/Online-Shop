import { Order } from './order.domain';
import { Product } from 'src/products/domain/product.domain';
import { Location } from 'src/products/domain/location.domain';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryColumn()
  orderId: string;

  @PrimaryColumn()
  productId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails)
  product: Product;

  @ManyToOne(() => Location, (location) => location.orderDetails)
  location: Location;

  @Column()
  quantity: number;
}
