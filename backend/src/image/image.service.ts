import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ImageRepository } from './image.repository';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffprobePath from '@ffprobe-installer/ffprobe';
import * as ffmpegPath from '@ffmpeg-installer/ffmpeg';

ffmpeg.setFfprobePath(ffprobePath.path);
ffmpeg.setFfmpegPath(ffmpegPath.path);

import {
  createReadStream,
  existsSync,
  promises,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';

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
        // INDEX가 0이고, 이게 비디오면, thumbnail 만든다.
        if (index === 0 && file.mimetype.includes('video')) {
          this.createThumbnail(file, postId, `${campId}/${postId}_thumbnail`);
        }
        const fileName = `${campId}/${postId}_${index}`;
        const fileUrl = await this.uploadFile(file, fileName);
        this.createImage(file.mimetype, fileUrl, postId);
      }),
    );
  }

  async uploadFile(file: Express.Multer.File, fileName: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucket_name,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    });
    try {
      await this.s3Client.send(command);
      return `${process.env.END_POINT}/${this.bucket_name}/${fileName}`;
    } catch (err) {
      console.error(err);
    }
  }

  async findImagesByPostId(postId: number) {
    const images = await this.imageRepository.findByPostId(postId);
    images.sort((a, b) => a.fileUrl.localeCompare(b.fileUrl));
    return images.map((image) => {
      if (image.mimetype.includes('video')) {
        return { ...image, isThumb: true };
      }
      return { ...image, isThumb: false };
    });
  }

  async createThumbnail(
    file: Express.Multer.File,
    postId: number,
    filename: string,
  ) {
    if (!existsSync('./temp')) {
      // console.log('시작하기 전 없음');
      await promises.mkdir('./temp/video', { recursive: true });
      await promises.mkdir('./temp/thumbnail', { recursive: true });
    }
    // 비디오 파일을 저장
    writeFileSync(`./temp/video/${postId}`, file.buffer);
    // 비디오 파일을 읽어서 screenshot 찍고
    ffmpeg(`./temp/video/${postId}`)
      .takeScreenshots({
        count: 1,
        filename: `./temp/thumbnail/${postId}.png`,
      })
      .on('end', async () => {
        // 생성된 thumbnail을 ExpressFile로 형변환을 한 후에 uploadFile 호출
        const fileStream = this.readFileToExpressFile(
          `./temp/thumbnail/${postId}.png`,
        );
        this.uploadFile(fileStream, `${filename}`);
        // temp 폴더 내의 파일 삭제
        unlinkSync(`./temp/video/${postId}`);
        unlinkSync(`./temp/thumbnail/${postId}.png`);
      });
  }
  /**
   * 이미지 DB에 저장할지 여부 판단하고, 저장
   */
  createImage(mimetype: string, fileUrl: string, postId: number) {
    if (postId !== -1) {
      this.imageRepository.create({ fileUrl, postId, mimetype });
    }
  }
  /**
   * thumbnail용 파일 읽고 Express.Multer.File로 변환하기
   */
  readFileToExpressFile(filePath: string): Express.Multer.File {
    const fileBuffer = readFileSync(filePath);
    return {
      fieldname: null,
      originalname: null,
      encoding: '7bit',
      mimetype: `image/png`,
      buffer: fileBuffer,
      size: null,
      stream: null,
      destination: null,
      filename: null,
      path: null,
    };
  }
}
