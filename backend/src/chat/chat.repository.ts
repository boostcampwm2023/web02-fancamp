import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatRepository {
  private chatRepository: Repository<Chat>;

  constructor(private readonly dataSource: DataSource) {
    this.chatRepository = this.dataSource.getRepository(Chat);
  }

  createChat(createChatDto: CreateChatDto) {
    // console.log(createChatDto);
    return this.chatRepository.save(createChatDto);
  }

  // async findChatsByUserIdOrMasterId(
  //   userId: number,
  //   masterId: number,
  //   cursor: Date,
  // ): Promise<Chat[]> {
  //   if (userId !== masterId) {
  //     // userId와 masterId가 다르면 camper
  //     return this.chatRepository.find({
  //       where: [
  //         { senderId: userId, masterId: masterId }, // camper의 경우 sender가 userId인 채팅
  //         { senderId: masterId }, // camper의 경우 sender가 masterId인 채팅
  //       ],
  //     });
  //   } else {
  //     // userId와 masterId가 같으면 master
  //     return this.chatRepository.find({
  //       where: [
  //         { masterId: masterId }, // master의 경우 masterId가 masterId인 채팅
  //       ],
  //     });
  //   }
  // }

  async findChatsByUserIdOrMasterId(
    userId: number,
    masterId: number,
    cursor: Date,
  ): Promise<Chat[]> {
    if (userId !== masterId) {
      // userId와 masterId가 다르면 camper
      return this.chatRepository.find({
        where: [
          {
            senderId: userId,
            masterId: masterId,
            createdAt: LessThan(cursor), // cursor 이후의 채팅만 가져오기
          },
          {
            senderId: masterId,
            createdAt: LessThan(cursor), // cursor 이후의 채팅만 가져오기
          },
        ],
        order: {
          createdAt: 'DESC', // 내림차순으로 정렬하여 최신 채팅이 먼저 오도록 함
        },
        take: 20, // 최대 20개의 결과만 가져오도록 제한
      });
    } else {
      // userId와 masterId가 같으면 master
      return this.chatRepository.find({
        where: [
          {
            masterId: masterId,
            createdAt: LessThan(cursor), // cursor 이후의 채팅만 가져오기
          },
        ],
        order: {
          createdAt: 'DESC', // 내림차순으로 정렬하여 최신 채팅이 먼저 오도록 함
        },
        take: 20, // 최대 20개의 결과만 가져오도록 제한
      });
    }
  }
}
