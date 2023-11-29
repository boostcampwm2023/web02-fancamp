import { Module } from '@nestjs/common';
import { CampModule } from 'src/camp/camp.module';
import { NoticeGateway } from './notice.gateway';

@Module({
  imports: [CampModule],
  providers: [NoticeGateway],
  exports: [NoticeGateway],
})
export class NoticeModule {}
