import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ERR_MESSAGE } from 'src/utils/constants';

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

  async findOne(camperId: number, masterId: number) {
    if (!(await this.subscriptionRepository.findOne(camperId, masterId))) {
      throw new HttpException(
        ERR_MESSAGE.NOT_SUBSCRIBED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getSubscriptions(publicId: string) {
    return this.subscriptionRepository.findAllByPublicId(publicId);
  }

  async findOneByPublicIdAndCampName(publicId: string, campName: string) {
    if (
      !(await this.subscriptionRepository.findOneByPublicIdAndCampName(
        publicId,
        campName,
      ))
    ) {
      throw new HttpException(
        ERR_MESSAGE.NOT_SUBSCRIBED,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCount(masterId: number) {
    return this.subscriptionRepository.count(masterId);
  }

  async remove(publicId: string, campName: string) {
    return this.subscriptionRepository.remove(publicId, campName);
  }
}
