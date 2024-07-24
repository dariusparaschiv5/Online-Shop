import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../domain/role.enum';

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

  @ApiProperty({ enum: Role, default: Role.CUSTOMER })
  readonly role: Role;
}
