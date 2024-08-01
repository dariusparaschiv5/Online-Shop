import { ProductDTO } from '../../products/dto/product.dto';
import { OrderDTO } from './order.dto';
import { LocationDTO } from '../../products/dto/location.dto';

export class OrderDetailDTO {
  order: OrderDTO;
  product: ProductDTO;
  location: LocationDTO;
  quantity: number;

  constructor(
    order: OrderDTO,
    product: ProductDTO,
    shippedFrom: LocationDTO,
    quantity: number,
  ) {
    this.order = order;
    this.product = product;
    this.location = shippedFrom;
    this.quantity = quantity;
  }
}
