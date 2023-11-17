import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}
  create(createChatDto: CreateChatDto) {
    return this.chatRepository.createChat(createChatDto);
  }

  createFromSocket(message: string, sender: string, campId: string) {
    //TODO: campID로 masterId 찾아서 저장.
    const createDto: CreateChatDto = {
      stringContent: message,
      sender: sender,
      masterId: campId,
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
