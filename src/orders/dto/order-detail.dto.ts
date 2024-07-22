import { ProductDTO } from 'src/products/dto/product.dto';
import { OrderDTO } from './order.dto';
import { LocationDTO } from 'src/products/dto/location.dto';

export class OrderDetailDTO {
  order: OrderDTO;
  products: ProductDTO[];
  location: LocationDTO;
  quantity: number;
}
