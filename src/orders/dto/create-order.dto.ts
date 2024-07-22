import { ApiProperty } from '@nestjs/swagger';

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
}
