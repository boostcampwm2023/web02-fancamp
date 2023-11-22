import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampRepository } from './camp.repository';
import { UserService } from 'src/user/user.service';
import { SubscriptionService } from './subscription.service';
import { resourceLimits } from 'worker_threads';

@Injectable()
export class CampService {
  constructor(
    private readonly campRepository: CampRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
  ) {}
  async create(createCampDto: CreateCampDto, publicId: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    if (user.isMaster) {
      const result = await this.campRepository.createCamp(
        createCampDto,
        user.id,
      );
      return { campName: result.campName, bannerImage: result.bannerImage };
    }
    throw new UnauthorizedException("camper can't make camp");
  }

  // findAll() {
  //   return `This action returns all camp`;
  // }

  findOne(campName: string) {
    return this.campRepository.findOneByCampName(campName);
  }

  async subscribe(publicId: string, campName: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const camperId = user.id;
    const camp = await this.findOne(campName);
    const masterId = camp.masterId;
    this.subscriptionService.create({
      camperId: camperId,
      masterId: masterId,
      isSubscribe: true,
    });
    // throw new Error('Method not implemented.');
  }
  async getSubscriptions(publicId: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const camperId = user.id;
    console.log('campid', camperId);
    return this.subscriptionService.findAll(camperId);
  }
  async getSubscription(publicId: string, campName: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const camperId = user.id;
    const camp = await this.findOne(campName);
    const masterId = camp.masterId;
    return this.subscriptionService.findOne(camperId, masterId);
  }
}
