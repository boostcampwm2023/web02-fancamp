import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('camperIn')
  async handleCamperIn(socket: Socket, data: any): Promise<void> {
    console.log(
      `캠퍼인 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { publicId, campName } = data;
    const { roomName, detailRoomName } =
      await this.chatService.getRoomName(campName);
    socket.join(roomName);
  }

  @SubscribeMessage('masterIn')
  async handleMasterIn(socket: Socket, data: any): Promise<void> {
    console.log(
      `마스터인 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { publicId, campName } = data;
    const { roomName, detailRoomName } =
      await this.chatService.getRoomName(campName);
    socket.join([roomName, detailRoomName]);
  }

  @SubscribeMessage('camperMessage')
  async handleCamperMessage(socket: Socket, data: any): Promise<void> {
    console.log(
      `캠퍼메세지 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { message, publicId, campName } = data; //TODO: 받아오는것도 DTO로.
    const chatWithSender = await this.chatService.createFromSocket(
      message,
      publicId,
      campName,
    );
    const { roomName, detailRoomName } =
      await this.chatService.getRoomName(campName);
    socket.to(detailRoomName).emit('message', chatWithSender);
  }

  @SubscribeMessage('masterMessage')
  async handleMasterMessage(socket: Socket, data: any): Promise<void> {
    console.log(
      `마스터메세지- socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { message, publicId, campName } = data; //TODO: 받아오는것도 DTO로.
    const chatWithSender = await this.chatService.createFromSocket(
      message,
      publicId,
      campName,
    );
    const { roomName, detailRoomName } =
      await this.chatService.getRoomName(campName);
    socket.broadcast.to(roomName).emit('message', chatWithSender);
    this.chatService.noticeMasterMessage(+roomName, campName);
  }

  @SubscribeMessage('camperOut')
  handleCamperOut(socket: Socket, data: any): void {
    console.log(
      `캠퍼아웃 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    socket.disconnect();
  }

  @SubscribeMessage('masterOut')
  handleMasterOut(socket: Socket, data: any): void {
    console.log(
      `마스터아웃 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    socket.disconnect();
  }
}
