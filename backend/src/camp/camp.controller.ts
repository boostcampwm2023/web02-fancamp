import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { CampService } from './camp.service';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('camps')
@Controller('camps')
export class CampController {
  constructor(private readonly campService: CampService) {}

  @Post()
  create(@Body() createCampDto: CreateCampDto) {
    return this.campService.create(createCampDto);
  }

  // @Get()
  // findAll() {
  //   return this.campService.findAll();
  // }

  @Get(':campName')
  findOne(@Param('campName') campName: string) {
    return this.campService.findOne(campName);
  }

  @Post('subscriptions/:campName')
  subscribe(@Param('campName') campName: string, @Req() request: Request) {
    // 쿠키의 publicId로 userId 찾기위해 넘겨주기
    this.campService.subscribe(request.cookies['publicId'], campName);
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
