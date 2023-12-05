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

  /**
   * 캠프 생성
   * @param createCampDto
   * @returns 생성 된 캠프 정보
   */
  async create(createCampDto: CreateCampDto) {
    return this.campRepository.createCamp(createCampDto);
  }
  /**
   * 모든 캠프 정보 가져오기
   * @returns 모든 캠프 정보
   */
  async findAll(cursor: number) {
    const camps = await this.campRepository.findAll(cursor);
    if (!camps.length) {
      return {
        cursor: cursor,
        nextCursor: null,
        result: [],
      };
    }
    return { cursor: cursor, nextCursor: camps.slice(-1)[0].campId, camps };
  }

  /**
   * campName으로 특정 캠프 정보 찾기
   * @returns 캠프 정보와 구독자 수
   */
  async findOne(campName: string) {
    return this.campRepository.findOneByCampNameWithJoin(campName);
  }

  /**
   * 캠프 구독
   */
  async subscribe(publicId: string, campName: string) {
    const camp = await this.campRepository.findOneByCampName(campName);
    this.subscriptionService.create({
      publicId: publicId,
      masterId: camp.masterId,
      isSubscribe: true,
    });
  }

  /**
   * 캠프 정보 수정
   * @returns
   */
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

  /**
   * keyword로 검색하기
   * @returns
   */
  search(keyword: string) {
    return this.campRepository.search(keyword);
  }
}
