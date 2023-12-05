import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CampService } from './camp.service';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { SubscriptionService } from './subscription.service';

@ApiTags('camps')
@Controller('camps')
export class CampController {
  constructor(
    private readonly campService: CampService,
    private readonly subscriptionService: SubscriptionService,
  ) {}

  // 전체 캠프 정보 가져오기
  @Get()
  findAll() {
    return this.campService.findAll();
  }

  // 로그인 한 사람의 구독하고 있는 모든 캠프 정보 찾기
  @UseGuards(AuthGuard)
  @Get('subscriptions')
  getSubscriptions(@Req() request: Request) {
    // 쿠키의 publicId로 userId 찾기위해 넘겨주기
    return this.subscriptionService.getSubscriptions(
      request.cookies['publicId'],
    );
  }

  // camp 정보와 구독자 수
  @Get(':campName')
  findOne(@Param('campName') campName: string) {
    return this.campService.findOne(campName);
  }

  // 캠프 정보 update
  @UseGuards(AuthGuard)
  @Put(':campName')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('campName') campName: string,
    @Body() updateCampDto: UpdateCampDto,
  ) {
    return this.campService.update(file, campName, updateCampDto);
  }

  // 로그인 한 사람의 구독 여부 찾기
  @UseGuards(AuthGuard)
  @Get(':campName/subscriptions')
  getSubscription(
    @Req() request: Request,
    @Param('campName') campName: string,
  ) {
    return this.subscriptionService.findOneByPublicIdAndCampName(
      request.cookies['publicId'],
      campName,
    );
  }

  // 캠프 구독
  @UseGuards(AuthGuard)
  @Post(':campName/subscriptions')
  subscribe(@Param('campName') campName: string, @Req() request: Request) {
    this.campService.subscribe(request.cookies['publicId'], campName);
  }

  // 캠프 구독 취소
  @UseGuards(AuthGuard)
  @Delete(':campName/subscriptions')
  remove(@Param('campName') campName: string, @Req() request: Request) {
    return this.subscriptionService.remove(
      request.cookies['publicId'],
      campName,
    );
  }

  // 캠프 검색
  @Get('search/:keyword')
  async searchCampByKeyword(@Param('keyword') keyword: string) {
    return await this.campService.search(keyword);
  }
}
