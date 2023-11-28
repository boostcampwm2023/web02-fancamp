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
    console.log(createSubscriptionDto);
    return this.subscriptionRepository.save(createSubscriptionDto);
  }

  findOne(camperId: number, masterId: number) {
    return this.subscriptionRepository.findOneBy({ camperId, masterId });
  }
  findAll(camperId: number) {
    return this.subscriptionRepository.findBy({ camperId });
  }

  count(masterId: number) {
    return this.subscriptionRepository.count({ where: { masterId } });
  }
}
