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
  locationId: string;

  @PrimaryGeneratedColumn('uuid', { name: 'ProductId' })
  productsId: string[];

  @Column({
    name: 'Quantity',
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn({ name: 'LocationId' })
  location: Location;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'ProductId' })
  products: Product[];
}
