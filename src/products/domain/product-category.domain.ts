import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.domain';

@Entity()
export class ProductCategory {
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

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
