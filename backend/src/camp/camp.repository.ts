import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Camp } from './entities/camp.entity';
import { CreateCampDto } from './dto/create-camp.dto';
import { Subscription } from './entities/subscription.entity';

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

  async findOneByCampNameWithJoin(campName: string) {
    return await this.campRepository
      .createQueryBuilder('camp')
      .innerJoin(
        Subscription,
        'subscription',
        'camp.masterId = subscription.masterId',
      )
      .select(['camp.*', 'COUNT(*) AS subscription_count'])
      .where({ campName })
      .andWhere('subscription.isSubscribe = true')
      .groupBy('camp.campId') // 그룹화할 열 추가
      .getRawOne();
  }
}
