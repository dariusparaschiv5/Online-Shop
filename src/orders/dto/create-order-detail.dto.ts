import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailDTO {
  @ApiProperty()
  ordersId: string;

  @ApiProperty({ type: [String] })
  productsId: string[];

  @ApiProperty()
  locationId: string;

  @ApiProperty()
  quantity: number;
}
