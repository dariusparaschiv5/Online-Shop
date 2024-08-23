import { ProductCategoryDTO } from './product-category.dto';
export class ProductDTO {
  name: string;
  description: string;
  price: number;
  weight: number;
  category: ProductCategoryDTO;
  supplier: string;
  imageUrl: string;

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    supplier: string,
    imageUrl: string,
    category: ProductCategoryDTO,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
    this.category = category;
  }
}
