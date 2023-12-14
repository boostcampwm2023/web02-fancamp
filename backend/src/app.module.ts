import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { LoggerMiddleware } from './utils/logger.middleware';
import { CampModule } from './camp/camp.module';
import { ChatModule } from './chat/chat.module';
import { PostModule } from './post/post.module';
import { ImageModule } from './image/image.module';
import { NoticeModule } from './notice/notice.module';

@Module({
  imports: [
    PrometheusModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      // logging: true,
      entities: [User],
      autoLoadEntities: true,
    }),
    UserModule,
    CampModule,
    AuthModule,
    ChatModule,
    PostModule,
    ImageModule,
    NoticeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
