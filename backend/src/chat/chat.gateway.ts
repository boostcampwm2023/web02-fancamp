import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  // constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('camperIn')
  handleCamperIn(socket: Socket, data: any): void {
    console.log(`socket.id: ${socket.id} | data: ${JSON.stringify(data)}`);
    const { userId, campId } = data;
    socket.join(campId);
  }

  @SubscribeMessage('masterIn')
  handleMasterIn(socket: Socket, data: any): void {
    console.log(`socket.id: ${socket.id} | data: ${JSON.stringify(data)}`);
    const { userId, campId } = data;
    socket.join(campId);
  }

  @SubscribeMessage('camperMessage')
  handleCamperMessage(socket: Socket, data: any): void {
    console.log(`socket.id: ${socket.id} | data: ${JSON.stringify(data)}`);
    const { message, camperId, campId } = data; //TODO: 받아오는것도 DTO로.
    // this.chatService.createFromSocket(message, camperId, campId);
    // socket.to(`${campId}-detail`).emit('message', message);
  }

  @SubscribeMessage('masterMessage')
  handleMasterMessage(socket: Socket, data: any): void {
    console.log(`socket.id: ${socket.id} | data: ${JSON.stringify(data)}`);
    const { message, masterId, campId } = data; //TODO: 받아오는것도 DTO로.
    // this.chatService.createFromSocket(message, masterId, campId);
    socket.broadcast.to(campId).emit('message', message);
  }
}
