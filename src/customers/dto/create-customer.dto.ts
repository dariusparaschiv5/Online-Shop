import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDTO {
  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  readonly emailAddress: string;
}
