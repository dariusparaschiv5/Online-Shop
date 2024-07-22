import { LocationDTO } from './location.dto';
import { ProductCategoryDTO } from './product-category.dto';

export class StockDTO {
  product: ProductCategoryDTO;
  location: LocationDTO;
  quantity: number;
}
