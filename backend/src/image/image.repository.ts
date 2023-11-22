import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { concatMap } from 'rxjs';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
@Injectable()
export class ImageRepository {
  private imageRepository: Repository<Image>;

  constructor(private readonly dataSource: DataSource) {
    this.imageRepository = this.dataSource.getRepository(Image);
  }

  create(createImageDto: CreateImageDto) {
    createImageDto;
    return this.imageRepository.save(createImageDto);
  }
}
