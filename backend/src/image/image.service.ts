import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

import { v4 as uuidv4 } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class ImageService {
  s3Client = new S3Client({
    endpoint: 'https://kr.object.ncloudstorage.com',
    forcePathStyle: true,
    region: process.env.REGION,
    credentials: {
      secretAccessKey: process.env.SECRET_KEY,
      accessKeyId: process.env.ACCESS_KEY,
    },
  });
  bucket_name = process.env.BUCKET_NAME;
  async uploadFile(file: Express.Multer.File) {
    const key = `${uuidv4()}.${file.originalname.split('.')[1]}`;
    const command = new PutObjectCommand({
      Bucket: this.bucket_name,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });
    try {
      const response = await this.s3Client.send(command);
      console.log(response);
      return key;
    } catch (err) {
      console.error(err);
    }
  }

  create(createImageDto: CreateImageDto) {
    return 'This action adds a new image';
  }

  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
