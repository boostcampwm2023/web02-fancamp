import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { UserService } from 'src/user/user.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ERR_MESSAGE } from 'src/utils/constants';
import { CampRepository } from './camp.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly campRepository: CampRepository,
  ) {}
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.createSubscription(
      createSubscriptionDto,
    );
  }
  async findOne(camperId: number, masterId: number) {
    if (!(await this.subscriptionRepository.findOne(camperId, masterId))) {
      throw new HttpException(
        ERR_MESSAGE.NOT_SUBSCRIBED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(camperId: number) {
    const subscriptions = await this.subscriptionRepository.findAll(camperId);
    return await Promise.all(
      subscriptions.map(async (subscription) => {
        const camp = await this.campRepository.findOneByMasterId(
          subscription.masterId,
        );
        return camp;
      }),
    );
  }
}
