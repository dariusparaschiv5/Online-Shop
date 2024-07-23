import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly weight: number;

  @ApiProperty()
  readonly categoryId: string;

  @ApiProperty()
  readonly supplier: string;

  @ApiProperty()
  readonly imageUrl: string;
}
