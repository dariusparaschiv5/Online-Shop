import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from './product-category.domain';
import { OrderDetail } from '../../orders/domain/order-detail.domain';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 'name',
  })
  name: string;

  @Column({
    default: 'description',
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  price: number;

  @Column({
    default: 0.0,
  })
  weight: number;

  @Column({
    default: 'supplier',
  })
  supplier: string;

  @Column({
    default: 'imageUrl',
  })
  imageUrl: string;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  category: ProductCategory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product, {
    cascade: ['remove'],
  })
  orderDetails: OrderDetail[];
}
