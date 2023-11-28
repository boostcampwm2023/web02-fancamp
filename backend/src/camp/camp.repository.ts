import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Camp } from './entities/camp.entity';
import { CreateCampDto } from './dto/create-camp.dto';

@Injectable()
export class CampRepository {
  private campRepository: Repository<Camp>;

  constructor(private readonly dataSource: DataSource) {
    this.campRepository = this.dataSource.getRepository(Camp);
  }

  createCamp(createCampDto: CreateCampDto) {
    return this.campRepository.save(createCampDto);
  }

  findAll() {
    return this.campRepository.find();
  }

  findOneByMasterId(masterId: number) {
    return this.campRepository.findOneBy({ masterId });
  }

  findOneByCampName(campName: string) {
    return this.campRepository.findOneBy({ campName });
  }

  async update(camp: Camp) {
    return this.campRepository.save(camp);
  }
}
