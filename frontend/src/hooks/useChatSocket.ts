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
  const [isMasterOnline, setIsMasterOnline] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);

    const onMasterIn = () => {
      setIsMasterOnline(true);
    };
    const onMasterOut = () => {
      setIsMasterOnline(false);
    };

    socket.connect();
    socket.on('connect', onConnect);
    socket.emit(isMaster ? 'masterIn' : 'camperIn', {
      publicId,
      campName,
    });

    // 캠퍼가 마스터 온오프 이벤트받기
    if (!isMaster) {
      socket.on('masterIn', onMasterIn);
      socket.on('masterOut', onMasterOut);
    }

    return () => {
      if (!isMaster) {
        socket.off('masterIn', onMasterIn);
        socket.off('masterOut', onMasterOut);
      }
      socket.off('connect', onConnect);
      socket.emit(isMaster ? 'masterOut' : 'camperOut', { campName });
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('message', onMessage);
    return () => {
      socket.off('message', onMessage);
    };
  }, []);

  const handleSubmitMessage = (text: string) => {
    socket.emit(isMaster ? 'masterMessage' : 'camperMessage', {
      publicId,
      message: text,
      campName,
    });
  };

  return {
    messages,
    setMessages,
    isConnected,
    isMasterOnline,
    handleSubmitMessage,
  };
}
