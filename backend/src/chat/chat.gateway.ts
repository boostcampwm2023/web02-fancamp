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
  handleCamperIn(socket: Socket, data: any): void {
    console.log(
      `캠퍼인 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { publicId, campName } = data;
    //TODO: camp 테이블에서 campId 값 가져와서 룸 이름으로 사용
    socket.join(campName);
  }

  @SubscribeMessage('masterIn')
  handleMasterIn(socket: Socket, data: any): void {
    console.log(
      `마스터인 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { publicId, campName } = data;
    socket.join([campName, `${campName}-detail`]);
  }

  @SubscribeMessage('camperMessage')
  handleCamperMessage(socket: Socket, data: any): void {
    console.log(
      `캠퍼메세지 - socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { message, publicId, campName } = data; //TODO: 받아오는것도 DTO로.
    this.chatService.createFromSocket(message, publicId, campName);
    socket.to(`${campName}-detail`).emit('message', message);
  }

  @SubscribeMessage('masterMessage')
  handleMasterMessage(socket: Socket, data: any): void {
    console.log(
      `마스터메세지- socket.id: ${socket.id} | data: ${JSON.stringify(data)}`,
    );
    const { message, publicId, campName } = data; //TODO: 받아오는것도 DTO로.
    this.chatService.createFromSocket(message, publicId, campName);
    socket.broadcast.to(campName).emit('message', message);
  }
}
