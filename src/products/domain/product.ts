import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from './productCategory';

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
    name: 'ImageUrl',
    default: 'imageUrl',
  })
  imageUrl: string;

  @ManyToOne(() => ProductCategory, (category) => category.products)
  @JoinColumn({ name: 'id' })
  category: ProductCategory;
}