import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubscriptionRepository } from './subscription.repository';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ERR_MESSAGE } from 'src/utils/constants';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  /**
   * 캠프 구독
   * @returns
   */
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionRepository.createSubscription(
      createSubscriptionDto,
    );
  }

  /**
   * publicId로 구독하고 있는 모든 캠프 정보 가져오기
   */
  async getSubscriptions(publicId: string) {
    return this.subscriptionRepository.findAllByPublicId(publicId);
  }

  /**
   * publicId와 campName으로 해당 캠프 구독했는지 확인
   */
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

  /**
   * masterId로 구독자 수 가져오기
   * @returns 구독자 수
   */
  async getCount(masterId: number) {
    return this.subscriptionRepository.count(masterId);
  }

  /**
   * 구독 취소
   */
  async remove(publicId: string, campName: string) {
    return this.subscriptionRepository.remove(publicId, campName);
  }
}
