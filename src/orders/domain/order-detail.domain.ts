import { Order } from './order.domain';
import { Product } from '../../products/domain/product.domain';
import { Location } from '../../products/domain/location.domain';
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

  locationId: string;
  @Column()
  quantity: number;

  constructor(
    orderId: string,
    productId: string,
    shippedFrom: Location,
    quantity: number,
  ) {
    this.orderId = orderId;
    this.productId = productId;
    this.location = shippedFrom;
    this.quantity = quantity;
  }
}
