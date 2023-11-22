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

  async findChatsByUserIdOrMasterId(
    userId: number,
    masterId: number,
  ): Promise<Chat[]> {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .where(
        '(chat.senderId = :userId AND chat.masterId = :masterId) OR chat.senderId = :masterId',
        { userId, masterId },
      )
      .getMany();
  }
}
