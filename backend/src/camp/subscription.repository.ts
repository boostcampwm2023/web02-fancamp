import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { concatMap } from 'rxjs';

@Injectable()
export class SubscriptionRepository {
  private subscriptionRepository: Repository<Subscription>;

  constructor(private readonly dataSource: DataSource) {
    this.subscriptionRepository = this.dataSource.getRepository(Subscription);
  }

  createSubscription(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.query(
      'INSERT INTO `subscription` (camperId, masterId, isSubscribe) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE isSubscribe = VALUES(isSubscribe)',
      [
        createSubscriptionDto.camperId,
        createSubscriptionDto.masterId,
        createSubscriptionDto.isSubscribe,
      ],
    );
  }

  findOne(camperId: number, masterId: number) {
    return this.subscriptionRepository.findOneBy({
      camperId,
      masterId,
      isSubscribe: true,
    });
  }

  findAll(camperId: number) {
    return this.subscriptionRepository.findBy({ camperId, isSubscribe: true });
  }

  count(masterId: number) {
    return this.subscriptionRepository.count({
      where: { masterId, isSubscribe: true },
    });
  }

  remove(camperId: number, masterId: number) {
    return this.subscriptionRepository
      .createQueryBuilder()
      .update(Subscription)
      .set({ isSubscribe: false })
      .where('camperId = :camperId', { camperId })
      .andWhere('masterId = :masterId', { masterId })
      .execute();
  }
}
