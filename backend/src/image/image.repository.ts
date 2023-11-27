import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { concatAll, concatMap } from 'rxjs';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dto/create-image.dto';
@Injectable()
export class ImageRepository {
  private imageRepository: Repository<Image>;

  constructor(private readonly dataSource: DataSource) {
    this.imageRepository = this.dataSource.getRepository(Image);
  }

  async create(createImageDto: CreateImageDto) {
    if (
      !(await this.imageRepository.findOneBy({
        imageUrl: createImageDto.imageUrl,
      }))
    ) {
      return this.imageRepository.save(createImageDto);
    }
  }
  findByPostId(postId: number) {
    return this.imageRepository
      .createQueryBuilder('image')
      .select(['image.imageUrl', 'image.isImage'])
      .where({
        postId,
        isDeleted: false,
      })
      .getMany();
  }
  checkAndUpdate() {}
}
