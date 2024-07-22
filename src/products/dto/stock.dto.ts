import { LocationDTO } from './location.dto';
import { ProductDTO } from './product.dto';

export class StockDTO {
  product: ProductDTO[];
  location: LocationDTO;
  quantity: number;
}
