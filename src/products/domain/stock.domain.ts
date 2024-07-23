import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from './product.domain';
import { Location } from './location.domain';

@Entity()
export class Stock {
  @PrimaryColumn()
  locationId: string;

  @PrimaryColumn()
  productId: string;

  @Column({
    default: 0,
  })
  quantity: number;

  @ManyToOne(() => Location, (location) => location.id)
  location: Location;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;
}
