import { CustomerDTO } from '../../customers/dto/customer.dto';

export class OrderDTO {
  customer: CustomerDTO;
  createdAt: Date;
  country: string;
  city: string;
  county: string;
  streetAdress: string;

  constructor(
    customer: CustomerDTO,
    createdAt: Date,
    addressCountry: string,
    addressCity: string,
    addressCounty: string,
    addressStreet: string,
  ) {
    this.customer = customer;
    this.createdAt = createdAt;
    this.country = addressCountry;
    this.city = addressCity;
    this.county = addressCounty;
    this.streetAdress = addressStreet;
  }
}
