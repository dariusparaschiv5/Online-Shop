import { ProductDTO } from 'src/products/dto/product.dto';
import { OrderDTO } from './order.dto';
import { LocationDTO } from 'src/products/dto/location.dto';

export class OrderDetailDto {
  order: OrderDTO;
  product: ProductDTO;
  location: LocationDTO;
  quantity: number;
}