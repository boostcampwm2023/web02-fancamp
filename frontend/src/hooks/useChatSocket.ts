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

  const onConnect = () => setIsConnected(true);

  useEffect(() => {
    // 캠퍼 이벤트 모음
    if (isMaster) {
      return;
    }

    const onMasterIn = () => {
      setIsMasterOnline(true);
    };
    const onMasterOut = () => {
      setIsMasterOnline(false);
    };

    socket.connect();
    socket.on('connect', onConnect);
    socket.on('masterIn', onMasterIn);
    socket.on('masterOut', onMasterOut);
    socket.emit('camperIn', {
      publicId,
      campName,
    });

    return () => {
      socket.emit('camperOut', { campName });
      socket.off('masterIn', onMasterIn);
      socket.off('masterOut', onMasterOut);
      socket.off('connect', onConnect);
    };
  }, []);

  useEffect(() => {
    // 마스터 이벤트 모음
    if (!isMaster) {
      return;
    }

    socket.connect();
    socket.on('connect', onConnect);
    socket.emit('masterIn', {
      publicId,
      campName,
    });

    return () => {
      socket.emit('masterOut', { campName });
      socket.off('connect', onConnect);
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
