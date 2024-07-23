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

  async create(location: Location): Promise<Location> {
    return this.locationsRepository.save(location);
  }

  async findOne(id: string): Promise<Location | null> {
    return this.locationsRepository.findOneBy({ id });
  }

  async findAll(): Promise<Location[]> {
    return this.locationsRepository.find();
  }

  async update(id: string, location: Location): Promise<Location> {
    const newLocation: Location = await this.locationsRepository.findOneBy({
      id,
    });
    Object.assign(newLocation, location);
    return this.locationsRepository.save(newLocation);
  }

  async remove(id: string): Promise<void> {
    this.locationsRepository.delete(id);
  }
}
