import { Injectable } from '@nestjs/common';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampRepository } from './camp.repository';

@Injectable()
export class CampService {
  constructor(private readonly campRepository: CampRepository) {}
  create(createCampDto: CreateCampDto) {
    return this.campRepository.createCamp(createCampDto);
  }

  // findAll() {
  //   return `This action returns all camp`;
  // }

  findOne(masterId: string) {
    return this.campRepository.findUserByMasterId(masterId);
  }

  // update(id: number, updateCampDto: UpdateCampDto) {
  //   return `This action updates a #${id} camp`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} camp`;
  // }
}
