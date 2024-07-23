import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDTO {
  @ApiProperty()
  locationId: string;

  @ApiProperty()
  productsId: string;

  @ApiProperty()
  quantity: number;
}
