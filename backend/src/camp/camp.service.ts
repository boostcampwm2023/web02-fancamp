import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampRepository } from './camp.repository';
import { UserService } from 'src/user/user.service';
import { SubscriptionService } from './subscription.service';
import { resourceLimits } from 'worker_threads';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class CampService {
  constructor(
    private readonly campRepository: CampRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}
  async create(createCampDto: CreateCampDto) {
    return this.campRepository.createCamp(createCampDto);
  }

  findAll() {
    return this.campRepository.findAll();
  }

  async findOne(campName: string) {
    const camp = await this.campRepository.findOneByCampName(campName);
    const user = await this.userService.findUserByPublicId(campName);
    const subscriptionCount = await this.subscriptionService.getCount(user.id);
    return { ...camp, subscriptionCount };
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
    return await this.subscriptionService.findAll(camperId);
  }
  async getSubscription(publicId: string, campName: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const camperId = user.id;
    const camp = await this.findOne(campName);
    const masterId = camp.masterId;
    return await this.subscriptionService.findOne(camperId, masterId);
  }

  async update(
    file: Express.Multer.File,
    campName: string,
    updateCampDto: UpdateCampDto,
  ) {
    const camp = await this.findOne(campName);
    const fileName = `${camp.campId}_banner`;
    if (file) {
      const fileUrl = await this.imageService.uploadFile(file, fileName, -1);
      camp.bannerImage = fileUrl;
    }
    if (updateCampDto.content) {
      camp.content = updateCampDto.content;
    }
    return this.campRepository.update(camp);
  }
}
