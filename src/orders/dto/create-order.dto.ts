import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from '../domain/order-detail.domain';

export class CreateOrderDTO {
  @ApiProperty()
  readonly customerId: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly country: string;

  @ApiProperty()
  readonly city: string;

  @ApiProperty()
  readonly county: string;

  @ApiProperty()
  readonly streetAdress: string;

  @ApiProperty()
  orderDetails: OrderDetail[];

  constructor(
    customerId: string,
    country: string,
    city: string,
    county: string,
    streetAdress: string,
    createdAt: Date,
  ) {
    this.customerId = customerId;
    this.country = country;
    this.city = city;
    this.county = county;
    this.streetAdress = streetAdress;
    this.createdAt = createdAt;
  }
}
