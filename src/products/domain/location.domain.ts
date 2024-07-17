import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({
    name: 'Name',
    default: 'name',
  })
  name: string;

  @Column({
    name: 'Adress.Country',
    default: 'country',
  })
  country: string;

  @Column({
    name: 'Adress.City',
    default: 'city',
  })
  city: string;

  @Column({
    name: 'Adress.County',
    default: 'county',
  })
  county: string;

  @Column({
    name: 'Adress.StreetAdress',
    default: 'streetAdress',
  })
  streetAdress: string;
}
