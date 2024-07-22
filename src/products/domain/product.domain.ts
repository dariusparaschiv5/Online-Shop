import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from './product-category.domain';
import { OrderDetail } from 'src/orders/domain/order-detail.domain';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'Name',
    default: 'name',
  })
  name: string;

  @Column({
    name: 'Description',
    default: 'description',
  })
  description: string;

  @Column({
    name: 'Price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  price: number;

  @Column({
    name: 'Weight',
    default: 0.0,
  })
  weight: number;

  @Column({
    name: 'Supplier',
    default: 'supplier',
  })
  supplier: string;

  @Column({
    name: 'ImageUrl',
    default: 'imageUrl',
  })
  imageUrl: string;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: 'ProductCategoryId' })
  category: ProductCategory;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
