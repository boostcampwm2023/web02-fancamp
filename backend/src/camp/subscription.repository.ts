import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { concatMap } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Camp } from './entities/camp.entity';

@Injectable()
export class SubscriptionRepository {
  private subscriptionRepository: Repository<Subscription>;

  constructor(private readonly dataSource: DataSource) {
    this.subscriptionRepository = this.dataSource.getRepository(Subscription);
  }
  /**
   * publicId로 masterId 찾고, 구독 upsert
   */
  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const user = await this.dataSource
      .getRepository(User)
      .findOneBy({ publicId: createSubscriptionDto.publicId });
    return this.subscriptionRepository.query(
      'INSERT INTO `subscription` (camperId, masterId, isSubscribe) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE isSubscribe = VALUES(isSubscribe)',
      [user.id, createSubscriptionDto.masterId, true],
    );
  }

  /**
   * masterId로 구독자 수 세기
   * @returns
   */
  count(masterId: number) {
    return this.subscriptionRepository.count({
      where: { masterId, isSubscribe: true },
    });
  }

  /**
   * publicId로 자신의 모든 구독 캠프 가져오기
   * @returns 자신의 모든 구독 캠프
   */
  async findAllByPublicId(publicId: string) {
    return await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoin(User, 'user', 'user.id = subscription.camperId')
      .innerJoin(Camp, 'camp', 'camp.masterId = subscription.masterId')
      .select(['camp.*'])
      .where('user.publicId = :publicId', { publicId })
      .andWhere('subscription.isSubscribe = true')
      .getRawMany();
  }

  /**
   * publicId와 CampName으로 구독 여부 가져오기
   * @returns
   */
  findOneByPublicIdAndCampName(
    publicId: string,
    campName: string,
  ): Promise<Camp> {
    return this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoin(User, 'user', 'user.id = subscription.camperId')
      .innerJoin(Camp, 'camp', 'camp.masterId = subscription.masterId')
      .select(['camp.*'])
      .where('user.publicId = :publicId', { publicId })
      .andWhere('camp.campName = :campName', { campName })
      .andWhere('subscription.isSubscribe = true')
      .getRawOne();
  }

  /**
   * 구독 취소
   */
  async remove(publicId: string, campName: string) {
    const subscription = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .innerJoin(User, 'user', 'user.id = subscription.camperId')
      .innerJoin(Camp, 'camp', 'camp.masterId = subscription.masterId')
      .select(['subscription.*'])
      .where('user.publicId = :publicId', { publicId })
      .andWhere('camp.campName = :campName', { campName })
      .getRawOne();

    return this.subscriptionRepository
      .createQueryBuilder()
      .update(Subscription)
      .set({ isSubscribe: false })
      .where('subscription.subscriptionId = :subscriptionId', {
        subscriptionId: subscription.subscriptionId,
      })
      .execute();
  }
}
