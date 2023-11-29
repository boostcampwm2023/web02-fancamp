import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from './chat.repository';
import { UserService } from '../user/user.service';
import { CampService } from '../camp/camp.service';
import { ERR_MESSAGE } from 'src/utils/constants';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userService: UserService,
    private readonly campService: CampService,
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
    return this.chatRepository.createChat(createDto);
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
    console.log('커서데이트', cursorDate, campName);
    const camp = await this.campService.findOne(campName);
    const user = await this.userService.findUserByPublicId(publicId);

    const chats = await this.chatRepository.findChatsByUserIdOrMasterId(
      user.id,
      camp.masterId,
      cursorDate,
    );
    console.log('chats', chats);
    if (!chats.length) {
      throw new HttpException(
        ERR_MESSAGE.NO_MORE_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      cursor: cursor,
      nextCursor: chats.slice(-1)[0].createdAt,
      result: chats,
    };
  }

  // findAll() {
  //   return `This action returns all chat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
