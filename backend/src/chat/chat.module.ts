import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chat.gateway';
import { UserModule } from 'src/user/user.module';
import { CampModule } from 'src/camp/camp.module';
import { AuthModule } from 'src/auth/auth.module';
import { NoticeModule } from 'src/notice/notice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat]),
    UserModule,
    CampModule,
    AuthModule,
    NoticeModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway],
  exports: [ChatService, ChatGateway],
})
export class ChatModule {}
