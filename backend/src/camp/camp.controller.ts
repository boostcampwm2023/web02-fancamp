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

@ApiTags('camps')
@Controller('camps')
@UseGuards(AuthGuard)
export class CampController {
  constructor(private readonly campService: CampService) {}

  @Get()
  findAll() {
    return this.campService.findAll();
  }

  @Get(':campName')
  findOne(@Param('campName') campName: string) {
    return this.campService.findOne(campName);
  }

  @Put(':campName')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('campName') campName: string,
    @Body() updateCampDto: UpdateCampDto,
  ) {
    return this.campService.update(file, campName, updateCampDto);
  }

  @Get(':campName/subscriptions')
  getSubscription(
    @Req() request: Request,
    @Param('campName') campName: string,
  ) {
    // 쿠키의 publicId로 userId 찾기위해 넘겨주기
    return this.campService.getSubscription(
      request.cookies['publicId'],
      campName,
    );
  }

  @Post(':campName/subscriptions')
  subscribe(@Param('campName') campName: string, @Req() request: Request) {
    // 쿠키의 publicId로 userId 찾기위해 넘겨주기
    this.campService.subscribe(request.cookies['publicId'], campName);
  }

  @Get('subscriptions')
  getSubscriptions(@Req() request: Request) {
    // 쿠키의 publicId로 userId 찾기위해 넘겨주기
    return this.campService.getSubscriptions(request.cookies['publicId']);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCampDto: UpdateCampDto) {
  //   return this.campService.update(+id, updateCampDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.campService.remove(+id);
  // }
}
