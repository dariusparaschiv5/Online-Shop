import { Role } from '../domain/role.enum';

export class CustomerDTO {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  emailAdress: string;
  role: Role;
}
