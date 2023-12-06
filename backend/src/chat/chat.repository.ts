import { Injectable } from '@nestjs/common';
import { DataSource, LessThan, Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { ChatMongoDB } from './schemas/chat.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatRepository {
  private chatRepository: Repository<Chat>;

  constructor(
    private readonly dataSource: DataSource,
    @InjectModel(ChatMongoDB.name) private chatModel: Model<ChatMongoDB>,
  ) {
    this.chatRepository = this.dataSource.getRepository(Chat);
  }

  createChat(createChatDto: CreateChatDto) {
    return this.chatRepository.save(createChatDto);
  }
  async findChatsByUserIdOrMasterId2(
    userId: number,
    masterId: number,
    cursor: Date,
  ): Promise<ChatMongoDB[]> {
    const query: any[] = [];

    if (userId !== masterId) {
      // userId와 masterId가 다르면 camper
      query.push({
        senderId: userId,
        masterId: masterId,
        createdAt: { $lt: cursor }, // cursor 이후의 채팅만 가져오기
      });
      query.push({
        senderId: masterId,
        createdAt: { $lt: cursor }, // cursor 이후의 채팅만 가져오기
      });
    } else {
      // userId와 masterId가 같으면 master
      query.push({
        masterId: masterId,
        createdAt: { $lt: cursor }, // cursor 이후의 채팅만 가져오기
      });
    }

    return this.chatModel
      .find({ $or: query })
      .sort({ createdAt: 'desc' }) // 내림차순으로 정렬하여 최신 채팅이 먼저 오도록 함
      .limit(20) // 최대 20개의 결과만 가져오도록 제한
      .select('-_id')
      .exec();
  }

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

  // async findChatsByUserIdOrMasterId(
  //   userId: number,
  //   masterId: number,
  //   cursor: Date,
  // ) {
  //   const queryBuilder = this.chatRepository
  //     .createQueryBuilder('chat')
  //     .innerJoin(User, 'user', 'chat.senderId = user.id')
  //     .orderBy('chat.createdAt', 'DESC')
  //     .where('chat.createdAt < :cursor', { cursor })
  //     .take(20); // 최대 20개의 결과만 가져오도록 제한

  //   if (userId !== masterId) {
  //     // userId와 masterId가 다르면 camper
  //     queryBuilder.andWhere(
  //       '(chat.senderId = :userId AND chat.masterId = :masterId) OR (chat.senderId = :masterId)',
  //       {
  //         userId,
  //         masterId,
  //       },
  //     );
  //   } else {
  //     // userId와 masterId가 같으면 master
  //     queryBuilder.andWhere('chat.masterId = :masterId', { masterId });
  //   }

  //   return queryBuilder.getMany();
  // }
}
