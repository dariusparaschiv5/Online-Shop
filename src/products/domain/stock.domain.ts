import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.domain';
import { Location } from './location.domain';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  locationId: string;

  @PrimaryGeneratedColumn('uuid')
  productsId: string[];

  @Column({
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;

  @ManyToOne(() => Product, (product) => product.id)
  products: Product[];
}
