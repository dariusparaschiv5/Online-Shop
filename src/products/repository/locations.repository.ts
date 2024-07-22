import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from '../domain/location.domain';
import { Repository } from 'typeorm';

@Injectable()
export class LocationsRepository {
  constructor(
    @InjectRepository(Location)
    private locationsRepository: Repository<Location>,
  ) {}

  create(location: Location) {
    return this.locationsRepository.save(location);
  }

  findOne(id: string) {
    return this.locationsRepository.findOneBy({ id });
  }

  findAll() {
    return this.locationsRepository.find();
  }

  async update(id: string, location: Location) {
    const newLocation: Location = await this.locationsRepository.findOneBy({
      id,
    });
    Object.assign(newLocation, location);
    return this.locationsRepository.save(newLocation);
  }

  remove(id: string) {
    return this.locationsRepository.delete(id);
  }
}
