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

  async createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    const user = await this.dataSource
      .getRepository(User)
      .findOneBy({ publicId: createSubscriptionDto.publicId });
    return this.subscriptionRepository.query(
      'INSERT INTO `subscription` (camperId, masterId, isSubscribe) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE isSubscribe = VALUES(isSubscribe)',
      [user.id, createSubscriptionDto.masterId, true],
    );
  }

  findOne(camperId: number, masterId: number) {
    return this.subscriptionRepository.findOneBy({
      camperId,
      masterId,
      isSubscribe: true,
    });
  }
  count(masterId: number) {
    return this.subscriptionRepository.count({
      where: { masterId, isSubscribe: true },
    });
  }

  findAll(camperId: number) {
    return this.subscriptionRepository.findBy({ camperId, isSubscribe: true });
  }
  // 자신이 구독한 캠프들 가져오기
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
