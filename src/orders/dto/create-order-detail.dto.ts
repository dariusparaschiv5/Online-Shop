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
}
