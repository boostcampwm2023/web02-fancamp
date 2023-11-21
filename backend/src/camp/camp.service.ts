import { Injectable } from '@nestjs/common';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampRepository } from './camp.repository';
import { UserService } from 'src/user/user.service';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class CampService {
  constructor(
    private readonly campRepository: CampRepository,
    private readonly subscriptionService: SubscriptionService,
    private readonly userService: UserService,
  ) {}
  create(createCampDto: CreateCampDto) {
    return this.campRepository.createCamp(createCampDto);
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

  // update(id: number, updateCampDto: UpdateCampDto) {
  //   return `This action updates a #${id} camp`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} camp`;
  // }
}
