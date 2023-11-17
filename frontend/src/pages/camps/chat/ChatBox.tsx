import { useState } from 'react';
import ChatBoxMessages from './ChatBoxMessages';
import ChatBoxNavBar from './ChatBoxNavBar';
import ChatBoxInputBar from './ChatBoxInputBar';

export interface Message {
  messageId: number;
  isMasterMessage: boolean;
  text: string;
  time: string;
}

const mockData = [
  {
    messageId: 0,
    isMasterMessage: false,
    text: '안녕하세요 팬입니다',
    time: '오후 3:01',
  },
  {
    messageId: 1,
    isMasterMessage: true,
    text: '반갑습니다 마스터입니다',
    time: '오후 3:20',
  },
];

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>(mockData);

  return (
    <div className="flex min-h-screen flex-col p-8">
      <ChatBoxNavBar />
      <ChatBoxMessages messages={messages} />
      <ChatBoxInputBar setMessages={setMessages} />
    </div>
  );
}
