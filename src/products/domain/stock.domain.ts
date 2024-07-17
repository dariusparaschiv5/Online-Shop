import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.domain';
import { Location } from './location.domain';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid', { name: 'LocationId' })
  ordersId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'ProductId' })
  productId: string;

  @Column({
    name: 'Quantity',
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'LocationId' })
  order: Location;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'ProductId' })
  product: Product;
}
