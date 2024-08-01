import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDTO {
  @ApiProperty()
  ordersId: string;

  @ApiProperty()
  productId: string;

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  quantity: number;

  constructor(
    order: string,
    product: string,
    locationId: string,
    quantity: number,
  ) {
    this.ordersId = order;
    this.productId = product;
    this.locationId = locationId;
    this.quantity = quantity;
  }
}
