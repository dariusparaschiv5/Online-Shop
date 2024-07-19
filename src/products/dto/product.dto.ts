import { ProductCategoryDTO } from './product-category.dto';
export class ProductDTO {
  name: string;
  description: string;
  price: number;
  weight: number;
  category: ProductCategoryDTO;
  supplier: string;
  imageUrl: string;
}
