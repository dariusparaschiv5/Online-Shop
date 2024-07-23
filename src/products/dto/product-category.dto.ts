import { ApiProperty } from '@nestjs/swagger';

export class ProductCategoryDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
