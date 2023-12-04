import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Like } from './entities/like.entity';
import { Comment } from './entities/comment.entity';
import { PostRepository } from './post.repository';
import { CampModule } from 'src/camp/camp.module';
import { UserModule } from 'src/user/user.module';
import { LikeRepository } from './like.repository';
import { CommentRepository } from './comment.repository';
import { ImageModule } from 'src/image/image.module';
import { NoticeGateway } from 'src/notice/notice.gateway';
import { NoticeModule } from 'src/notice/notice.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Like, Comment]),
    CampModule,
    UserModule,
    ImageModule,
    NoticeModule,
    AuthModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    TypeOrmModule,
    PostRepository,
    LikeRepository,
    CommentRepository,
  ],
})
export class PostModule {}
