import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'FirstName',
    nullable: false,
    default: '',
  })
  firstName: string;

  @Column({
    name: 'LastName',
    nullable: false,
    default: '',
  })
  lastName: string;

  @Column({
    name: 'Username',
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'Password',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    name: 'EmailAdress',
    nullable: false,
    default: '',
  })
  emailAdress: string;
}
