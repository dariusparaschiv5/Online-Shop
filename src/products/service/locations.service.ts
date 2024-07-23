import { Injectable, NotFoundException } from '@nestjs/common';
import { Location } from '../domain/location.domain';
import { LocationsRepository } from '../repository/locations.repository';

@Injectable()
export class LocationsService {
  constructor(private readonly locationsRepository: LocationsRepository) {}

  create(location: Location) {
    return this.locationsRepository.create(location);
  }

  findOne(id: string) {
    const location = this.locationsRepository.findOne(id);
    if (!location) {
      throw new NotFoundException(`Location with ID "${id}" not found`);
    }
    return location;
  }

  findAll() {
    return this.locationsRepository.findAll();
  }

  async update(id: string, location: Location) {
    const existingLocation = await this.findOne(id);
    Object.assign(existingLocation, location);
    return this.locationsRepository.update(id, existingLocation);
  }

  async remove(id: string) {
    return this.locationsRepository.remove(id);
  }
}
