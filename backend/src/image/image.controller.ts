import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadImage(@UploadedFiles() files: Array<Express.Multer.File>) {
    let urls = [];
    await Promise.all(
      files.map(async (file) => {
        const url = await this.imageService.uploadFile(file);
        urls.push(url);
      }),
    );
    console.log(urls);
  }

  // @Get()
  // findAll() {
  //   return this.imageService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.imageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
  //   return this.imageService.update(+id, updateImageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.imageService.remove(+id);
  // }
}
