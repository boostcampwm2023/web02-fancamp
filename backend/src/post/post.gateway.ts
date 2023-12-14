import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface HandlePostPage {
  campName: string;
}

@WebSocketGateway({ cors: true, namespace: 'post' })
export class PostGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    // console.log('소켓 연결됨');
    // console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('enterPostPage')
  handleEnterPostPage(socket: Socket, data: HandlePostPage) {
    const { campName } = data;
    // console.log('소켓 들어옴', new Date());
    // console.log(`${socket.id}, Enter ${campName}`);
    socket.join(`${campName}-page`);
  }

  @SubscribeMessage('leavePostPage')
  handleLeavePostPage(socket: Socket, data: HandlePostPage) {
    const { campName } = data;
    // console.log('소켓 leave', new Date());
    // console.log(`${socket.id}, Enter ${campName}`);
    socket.leave(`${campName}-page`);
  }

  handleCreatePost(data: any) {
    const { campName, res } = data;
    console.log(`Post ${res.postId}, Post ${res.content}`);
    this.server.to(`${campName}-page`).emit('createPost', res);
  }
}
