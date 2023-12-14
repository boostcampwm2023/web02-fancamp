import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  Req,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request, Response } from 'express';

@ApiTags('chats')
@Controller('chats')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('')
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @Get(':campName')
  async findOne(
    @Param('campName') campName: string,
    @Query('cursor') cursor: string,
    @Req() request: Request,
  ) {
    const result = await this.chatService.getPreviousChats(
      campName,
      request.cookies['publicId'],
      cursor,
    );
    return result;
  }
}
