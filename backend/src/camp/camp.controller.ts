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

  @Post('subscirbe/:campName')
  subscribe(
    @Param('campName') campName: string
    ){
    this.campService.subscribe(campName);
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
