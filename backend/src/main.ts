import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

//TODO: 클라이언트 연결되면 삭제 ->
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
//<-

async function bootstrap() {
  // const app = await NestFactory.create(AppModule); //TODO: 클라이언트 연결되면 주석 해제
  //TODO: 클라이언트 연결되면 삭제 ->
  const app = await NestFactory.create<NestExpressApplication>(AppModule); //express 사용하는 인스턴스 생성
  app.useStaticAssets(join(__dirname, 'static')); //정적 파일 경로 지정
  //<-
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Swagger Example')
    .setDescription('Swagger study API description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  app.enableCors({
    origin: ['http://localhost:5173', '*'], //origin이 *가 있으면 fetch옵션에 credential이 include일때 요청이 안옴.
    credentials: true, // 인증 정보를 서버로 전송할 수 있도록 허용
  });

  // config를 바탕으로 swagger document 생성
  const document = SwaggerModule.createDocument(app, config);
  // Swagger UI에 대한 path를 연결함
  // .setup('swagger ui endpoint', app, swagger_document)
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
