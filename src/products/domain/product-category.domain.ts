import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.domain';

@Entity()
export class ProductCategory {
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

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
