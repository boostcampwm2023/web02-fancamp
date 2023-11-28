import { Message } from '@components/chat/ChatBox';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

interface Parameters {
  isMaster: boolean;
  publicId: string;
  campName: string | undefined;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

export default function useChatSocket({
  socket,
  isMaster,
  publicId,
  campName,
}: Parameters) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<Boolean>(false);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    socket.connect();

    socket.on('connect', onConnect);
    socket.emit(isMaster ? 'masterIn' : 'camperIn', {
      publicId,
      campName,
    });
    return () => {
      socket.off('connect', onConnect);
      socket.emit(isMaster ? 'masterOut' : 'camperOut', { campName });

      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage = (stringContent: string) => {
      const newMessage = {
        chatId: messages.length + 1,
        isMyMessage: false,
        createdAt: String(new Date()),
        stringContent,
      };
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, []);

  const handleSubmitMessage = (message: string) => {
    socket.emit(isMaster ? 'masterMessage' : 'camperMessage', {
      publicId,
      message,
      campName,
    });
  };

  return { messages, setMessages, isConnected, handleSubmitMessage };
}
