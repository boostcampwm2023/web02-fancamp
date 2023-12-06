import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<ChatMongoDB>;

@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: false },
  versionKey: false,
})
export class ChatMongoDB {
  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date;

  @Prop({ type: String }) // MongoDB에 들어갈 설정들을 적어준다.
  userName: string; // 필드 이름: 타입(타입스크립트 타입)

  @Prop({ type: String })
  stringContent: string = '';

  @Prop({ type: String })
  picContent: string = '';

  @Prop({ type: Number })
  masterId: number;

  @Prop({ type: Number })
  senderId: number;

  @Prop({ type: String })
  senderChatName: string;

  @Prop({ type: String })
  senderPublicId: string;

  @Prop({ type: String })
  senderProfileImage: string;
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const ChatSchema = SchemaFactory.createForClass(ChatMongoDB);
