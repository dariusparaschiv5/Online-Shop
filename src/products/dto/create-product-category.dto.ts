import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;
}
