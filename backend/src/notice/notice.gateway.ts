import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CampService } from 'src/camp/camp.service';

@WebSocketGateway({ namespace: 'notice' })
export class NoticeGateway {
  constructor(private readonly campService: CampService) {}

  @WebSocketServer() server: Server;

  noticeChat(campId: number, campName: string) {
    this.server
      .to(`${campId}-notice`)
      .emit('notice', { type: 'chat', campName });
  }

  noticePost(campId: number, campName: string) {
    this.server
      .to(`${campId}-notice`)
      .emit('notice', { type: 'post', campName });
  }

  @SubscribeMessage('login')
  async camperJoin(socket: Socket, data: any) {
    const { publicId } = data;
    const camps = await this.campService.getSubscriptions(publicId);
    camps.map((camp) => {
      socket.join(`${camp.campId}-notice`);
    });
  }
}
