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

  constructor(
    name: string,
    description: string,
    price: number,
    weight: number,
    supplier: string,
    imageUrl: string,
    category: string,
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.weight = weight;
    this.supplier = supplier;
    this.imageUrl = imageUrl;
    this.categoryId = category;
  }
}
