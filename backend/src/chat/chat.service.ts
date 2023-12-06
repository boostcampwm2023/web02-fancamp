import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from './chat.repository';
import { UserService } from '../user/user.service';
import { CampService } from '../camp/camp.service';
import { ERR_MESSAGE } from 'src/utils/constants';
import { Chat } from './entities/chat.entity';
import { NoticeGateway } from 'src/notice/notice.gateway';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatDocument, ChatMongoDB } from './schemas/chat.schemas';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userService: UserService,
    private readonly campService: CampService,
    private readonly noticeGateway: NoticeGateway,
    @InjectModel(ChatMongoDB.name)
    private readonly chatModel: Model<ChatMongoDB>,
  ) {}
  create(createChatDto: CreateChatDto) {
    return this.chatRepository.createChat(createChatDto);
  }

  async createFromSocket(message: string, publicId: string, campName: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const camp = await this.campService.findOne(campName);
    const createDto: CreateChatDto = {
      stringContent: message,
      senderId: user.id,
      masterId: camp.masterId,
      picContent: '',
    };
    const chat = await this.chatRepository.createChat(createDto);
    return this.getChatWithSender(chat);
  }

  async getRoomName(campName: string) {
    const camp = await this.campService.findOne(campName);
    const roomName = camp.campId.toString();
    return {
      roomName: roomName,
      detailRoomName: ''.concat(roomName, '-detail'),
    };
  }

  async getPreviousChats(campName: string, publicId: string, cursor: string) {
    const cursorDate = new Date(cursor);
    const camp = await this.campService.findOne(campName);
    const user = await this.userService.findUserByPublicId(publicId);

    const chats = await this.chatRepository.findChatsByUserIdOrMasterId(
      user.id,
      camp.masterId,
      cursorDate,
    );

    if (!chats.length) {
      return {
        cursor: cursor,
        nextCursor: null,
        result: [],
      };
    }
    const chatsWithSender = await Promise.all(
      chats.map(async (chat) => {
        return this.getChatWithSender(chat);
      }),
    );

    return {
      cursor: cursor,
      nextCursor: chats.slice(-1)[0].createdAt,
      result: chatsWithSender,
    };
  }

  async getPreviousChats2(campName: string, publicId: string, cursor: string) {
    const cursorDate = new Date(cursor);
    const camp = await this.campService.findOne(campName);
    const user = await this.userService.findUserByPublicId(publicId);

    const chats = await this.chatRepository.findChatsByUserIdOrMasterId2(
      user.id,
      camp.masterId,
      cursorDate,
    );

    if (!chats.length) {
      return {
        cursor: cursor,
        nextCursor: null,
        result: [],
      };
    }

    return {
      cursor: cursor,
      nextCursor: chats.slice(-1)[0].createdAt,
      result: chats,
    };
  }

  async getChatWithSender(chat: Chat) {
    const sender = await this.userService.findUserByUserId(chat.senderId);
    return {
      ...chat,
      chatName: sender.chatName,
      publicId: sender.publicId,
      profileImage: sender.profileImage,
    };
  }

  async getChatWithSender2(createChatDto: CreateChatDto) {
    const sender = await this.userService.findUserByUserId(
      createChatDto.senderId,
    );
    return await this.chatModel.create({
      ...createChatDto,
      senderChatName: sender.chatName,
      senderPublicId: sender.publicId,
      senderProfileImage: sender.profileImage,
    });
  }

  async noticeMasterMessage(campId: number, campName: string) {
    this.noticeGateway.noticeChat(campId, campName);
  }
}
