import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampService } from './camp.service';
import { CreateCampDto } from './dto/create-camp.dto';
import { UpdateCampDto } from './dto/update-camp.dto';

@Controller('camp')
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

  @Get(':masterId')
  findOne(@Param('masterId') masterId: string) {
    return this.campService.findOne(masterId);
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
