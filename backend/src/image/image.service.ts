import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}
  s3Client = new S3Client({
    endpoint: process.env.END_POINT,
    forcePathStyle: true,
    region: process.env.REGION,
    credentials: {
      secretAccessKey: process.env.SECRET_KEY,
      accessKeyId: process.env.ACCESS_KEY,
    },
  });
  bucket_name = process.env.BUCKET_NAME;

  async uploadPostFiles(
    files: Array<Express.Multer.File>,
    postId: number,
    campId: number,
  ) {
    if (!files) {
      return;
    }
    await Promise.all(
      files.map(async (file, index) => {
        const fileName = `${campId}-${postId}_${index}`;
        await this.uploadFile(file, fileName, postId, -1);
      }),
    );
  }

  async uploadFile(
    file: Express.Multer.File,
    fileName: string,
    postId: number,
    userId: number,
  ) {
    const command = new PutObjectCommand({
      Bucket: this.bucket_name,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });
    try {
      const response = await this.s3Client.send(command);
      const fileUrl = `${process.env.END_POINT}/${this.bucket_name}/${fileName}`;
      const mimetype = file.mimetype;
      this.createImage({ fileUrl, postId, userId, mimetype });
      return fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  async createImage(createImageDto: CreateImageDto) {
    return this.imageRepository.create(createImageDto);
  }

  async findImagesByPostId(postId: number) {
    const images = await this.imageRepository.findByPostId(postId);
    images.sort((a, b) => a.fileUrl.localeCompare(b.fileUrl));
    return images;
  }
}
