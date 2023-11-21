import { Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { UserService } from 'src/user/user.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.createSubscription(
      createSubscriptionDto,
    );
  }
  findOne(camperId: number, masterId: number) {
    return this.subscriptionRepository.findOne(camperId, masterId);
  }
}
