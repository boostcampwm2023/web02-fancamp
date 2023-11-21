import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from './chat.repository';
import { UserService } from '../user/user.service';
import { CampService } from '../camp/camp.service';

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

  async getPreviousChats(campName: string, publicId: string) {
    const camp = await this.campService.findOne(campName);
    const user = await this.userService.findUserByPublicId(publicId);
    const chats = await this.chatRepository.findChatsByUserIdOrMasterId(
      user.id,
      camp.masterId,
    );

    if (!user.isMaster) {
      // 채팅 배열을 순회하면서 stringContent 수정
      const modifiedChats = chats.map((chat) => {
        const modifiedChat = { ...chat }; // 새로운 객체를 만들어 기존 채팅 객체를 복사
        if (modifiedChat.senderId === modifiedChat.masterId) {
          // 마스터가 보낸 메세지의 경우에만 replace 실행
          modifiedChat.stringContent = modifiedChat.stringContent.replace(
            /\(닉네임\)/g,
            user.chatName,
          );
        }
        return modifiedChat;
      });
      return modifiedChats;
    }
    // 마스터는 (닉네임)을 변경해주지 않는다.
    return chats;
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
