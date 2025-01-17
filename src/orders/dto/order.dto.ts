import { CustomerDTO } from '../../customers/dto/customer.dto';
import { OrderDetailDTO } from './order-detail.dto';

export class OrderDTO {
  customer: CustomerDTO;
  createdAt: Date;
  country: string;
  city: string;
  county: string;
  streetAdress: string;
  orderDetails: OrderDetailDTO[];
}
