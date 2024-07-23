import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDetailDTO } from './create-order-detail.dto';

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
  orderDetails: CreateOrderDetailDTO[];
}
