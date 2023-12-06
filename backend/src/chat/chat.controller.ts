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

  // @Get()
  // findAll() {
  //   return this.chatService.findAll();
  // }

  @Get(':campName')
  async findOne(
    @Param('campName') campName: string,
    @Query('cursor') cursor: string,
    @Req() request: Request,
  ) {
    // MySQL
    let startQueryTime = new Date();

    let result = await this.chatService.getPreviousChats(
      campName,
      request.cookies['publicId'],
      cursor,
    );
    let endQueryTime = new Date();
    let executionTime = endQueryTime.getTime() - startQueryTime.getTime();

    console.log(`MySQL Query execution time: ${executionTime} milliseconds`);
    // MongoDB
    let startQueryTime2 = new Date();

    let result2 = await this.chatService.getPreviousChats2(
      campName,
      request.cookies['publicId'],
      cursor,
    );
    let endQueryTime2 = new Date();
    let executionTime2 = endQueryTime2.getTime() - startQueryTime2.getTime();

    console.log(`MongoDB Query execution time: ${executionTime2} milliseconds`);
    // return result;
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
  //   return this.chatService.update(+id, updateChatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.chatService.remove(+id);
  // }
}
