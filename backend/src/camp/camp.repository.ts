import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Camp } from './entities/camp.entity';
import { CreateCampDto } from './dto/create-camp.dto';
import { Subscription } from './entities/subscription.entity';
import { Post } from 'src/post/entities/post.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CampRepository {
  private campRepository: Repository<Camp>;

  constructor(private readonly dataSource: DataSource) {
    this.campRepository = this.dataSource.getRepository(Camp);
  }

  createCamp(createCampDto: CreateCampDto) {
    return this.campRepository.save(createCampDto);
  }

  findAll(cursor: number) {
    return this.campRepository
      .createQueryBuilder('camp')
      .leftJoin(
        Subscription,
        'subscription',
        'camp.masterId = subscription.masterId AND subscription.isSubscribe = true',
      )
      .leftJoin(User, 'user', 'camp.masterId = user.id')
      .select([
        'camp.*',
        'user.publicId AS masterPublicId',
        'user.profileImage AS masterProfileImage',
        'COUNT(subscription.subscriptionId) AS subscriptionCount',
      ])
      .where('camp.campId > :cursor', { cursor })
      .orderBy('subscriptionCount', 'DESC')
      .groupBy('camp.campId')
      .limit(40)
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
    const result = await this.campRepository
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

    const postCount = await this.campRepository
      .createQueryBuilder('camp')
      .innerJoin(
        Post,
        'post',
        'camp.campId = post.campId AND post.isDeleted = false',
      )
      .select(['COUNT(*) AS postCount'])
      .where({ campName })
      .groupBy('camp.campId') // 그룹화할 열 추가
      .getRawOne();
    return { ...result, ...postCount };
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
