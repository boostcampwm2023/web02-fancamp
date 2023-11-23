import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
const region = 'kr-standard';
const access_key = 'CgAVwodOjOJ5chdDDZdw';
const secret_key = 'U7Vl6FVkHArDHmzB5dGfmmq92ueXcfXefPwAP1ky';
const s3Client = new S3Client({
  endpoint: 'https://kr.object.ncloudstorage.com',
  forcePathStyle: true,
  region: region,
  credentials: {
    secretAccessKey: secret_key,
    accessKeyId: access_key,
  },
});
const bucket_name = 'fancamp-test';
// @Controller('file')
export class FileController {
  //   @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    files.forEach(async (file) => {
      const command = new PutObjectCommand({
        Bucket: bucket_name,
        Key: 'user1/' + file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      });
      try {
        const response = await s3Client.send(command);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    });
  }
}
