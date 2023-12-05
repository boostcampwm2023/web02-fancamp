import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface HandleCommentPage {
  postId: string;
}

@WebSocketGateway({ cors: true, namespace: 'comment' })
export class CommentGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    // console.log('소켓 연결됨');
    // console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('enterCommentPage')
  handleEnterPostPage(socket: Socket, data: HandleCommentPage) {
    const { postId } = data;
    // console.log('소켓 들어옴', new Date());
    // console.log(`${socket.id}, Enter ${postId}`);
    socket.join(`${postId}-post`);
  }

  @SubscribeMessage('leaveCommentPage')
  handleLeavePostPage(socket: Socket, data: HandleCommentPage) {
    const { postId } = data;
    // console.log('소켓 leave', new Date());
    // console.log(`${socket.id}, Leave ${postId}`);
    socket.leave(`${postId}-post`);
  }

  handleCreateComment(data: any) {
    const { postId, content } = data;
    // console.log(`Post ${postId}, Comment ${content}`);
    // console.log('코맨트 만듬', new Date());
    this.server.to(`${data.postId}-post`).emit('createComment', data);
  }
}
