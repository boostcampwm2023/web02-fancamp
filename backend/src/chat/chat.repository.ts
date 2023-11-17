import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatRepository {
  private chatRepository: Repository<Chat>;

  constructor(private readonly dataSource: DataSource) {
    this.chatRepository = this.dataSource.getRepository(Chat);
  }

  createChat(createChatDto: CreateChatDto) {
    console.log(createChatDto);
    return this.chatRepository.save(createChatDto);
  }

  //   findUserByMasterId(masterId: string) {
  //     return this.chatRepository.findOneBy({ masterId });
  //   }
}
