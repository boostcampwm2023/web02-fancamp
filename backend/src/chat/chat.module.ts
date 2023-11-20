import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from './entities/chat.entity';
import { ChatRepository } from './chat.repository';
import { ChatGateway } from './chat.gateway';
import { UserModule } from 'src/user/user.module';
import { CampModule } from 'src/camp/camp.module'
import { UserService } from 'src/user/user.service';
import { CampService } from 'src/camp/camp.service';
import { UserRepository } from 'src/user/user.repository';
import { CampRepository } from 'src/camp/camp.repository';


@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UserModule, CampModule],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, ChatGateway, UserService, CampService, UserRepository, CampRepository],
})
export class ChatModule {}
