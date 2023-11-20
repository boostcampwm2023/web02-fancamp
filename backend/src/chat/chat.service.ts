import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from './chat.repository';
import {UserService} from '../user/user.service';
import {CampService} from '../camp/camp.service'

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository, private readonly userService: UserService, private readonly campService: CampService) {}
  create(createChatDto: CreateChatDto) {
    return this.chatRepository.createChat(createChatDto);
  }

  async createFromSocket(message: string, publicId: string, campName: string) {
    const user = await this.userService.findUserByPublicId(publicId);
    const camp = await this.campService.findOne(campName);
    const createDto: CreateChatDto = {
      stringContent: message,
      sender: user.id.toString(),
      masterId: camp.masterId.toString(),
      picContent: '',
    };
    return this.chatRepository.createChat(createDto);
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
