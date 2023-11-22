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
    if (userId !== masterId) {
      // userId와 masterId가 다르면 camper
      return this.chatRepository.find({
        where: [
          { senderId: userId, masterId: masterId }, // camper의 경우 sender가 userId인 채팅
          { senderId: masterId }, // camper의 경우 sender가 masterId인 채팅
        ],
      });
    } else {
      // userId와 masterId가 같으면 master
      return this.chatRepository.find({
        where: [
          { masterId: masterId }, // master의 경우 masterId가 masterId인 채팅
        ],
      });
    }
  }
}
