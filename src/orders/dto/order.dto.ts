import { CustomerDTO } from 'src/customers/dto/customer.dto';

export class OrderDTO {
  customer: CustomerDTO;
  createdAt: Date;
  country: string;
  city: string;
  county: string;
  streetAdress: string;
}
