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
    return this.campRepository
      .createQueryBuilder('camp')
      .leftJoin(
        Subscription,
        'subscription',
        'camp.masterId = subscription.masterId AND subscription.isSubscribe = true',
      )
      .select([
        'camp.*',
        'COUNT(subscription.subscriptionId) AS subscription_count',
      ])
      .groupBy('camp.campId')
      .getRawMany();
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
  /**
   * campName으로 캠프 정보와 구독자 수 찾기
   * @returns
   */
  async findOneByCampNameWithJoin(campName: string) {
    return await this.campRepository
      .createQueryBuilder('camp')
      .leftJoin(
        Subscription,
        'subscription',
        'camp.masterId = subscription.masterId AND subscription.isSubscribe = true',
      )
      .select([
        'camp.*',
        'COUNT(subscription.subscriptionId) AS subscriptionCount',
      ])
      .where({ campName })
      .groupBy('camp.campId') // 그룹화할 열 추가
      .getRawOne();
  }

  /**
   * 검색
   * @returns 검색 결과
   */
  search(keyword: string) {
    return this.campRepository
      .createQueryBuilder()
      .where(`MATCH (campName) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
      .orWhere(`MATCH (content) AGAINST ('${keyword}' IN BOOLEAN MODE)`)
      .getMany();
  }
}
