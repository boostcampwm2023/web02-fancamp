import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { CampRepository } from './camp.repository';
import { SubscriptionService } from './subscription.service';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class CampService {
  constructor(
    private readonly campRepository: CampRepository,
    private readonly subscriptionService: SubscriptionService,
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
    const subscriptionCount = await this.subscriptionService.getCount(
      camp.masterId,
    );
    return { ...camp, subscriptionCount };
  }

  async subscribe(publicId: string, campName: string) {
    const camp = await this.campRepository.findOneByCampName(campName);
    this.subscriptionService.create({
      publicId: publicId,
      masterId: camp.masterId,
      isSubscribe: true,
    });
  }

  async update(
    file: Express.Multer.File,
    campName: string,
    updateCampDto: UpdateCampDto,
  ) {
    const camp = await this.findOne(campName);
    const fileName = `${camp.campId}_banner`;
    if (file) {
      const fileUrl = await this.imageService.uploadFile(file, fileName);
      camp.bannerImage = fileUrl;
    }
    if (updateCampDto.content) {
      camp.content = updateCampDto.content;
    }
    return this.campRepository.update(camp);
  }
  search(keyword: string) {
    return this.campRepository.search(keyword);
  }
}
