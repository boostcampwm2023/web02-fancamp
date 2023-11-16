import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('camperMessage')
  handleCamperMessage(socket: Socket, data: any): void {
    console.log(`socket.id: ${socket.id} | data: ${data}`);
    const { message, campId } = data; //TODO: 받아오는것도 DTO로.
    //TODO: db 저장.
    socket.to(`${campId}-detail`).emit('message', message);
  }

  @SubscribeMessage('masterMessage')
  handleMasterMessage(socket: Socket, data: any): void {
    console.log(`socket.id: ${socket.id} | data: ${data}`);
    const { message, campId } = data; //TODO: 받아오는것도 DTO로.
    //TODO: db 저장.
    socket.broadcast.to(campId).emit('message', message);
  }
}
