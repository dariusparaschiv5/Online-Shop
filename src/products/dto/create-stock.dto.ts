import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDTO {
  @ApiProperty()
  locationId: string;

  @ApiProperty({ type: [String] })
  productsId: string[];

  @ApiProperty()
  quantity: number;
}
