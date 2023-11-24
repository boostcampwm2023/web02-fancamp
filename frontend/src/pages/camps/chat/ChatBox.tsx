import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ChatBoxMessages from './ChatBoxMessages';
import ChatBoxNavBar from './ChatBoxNavBar';
import ChatBoxInputBar from './ChatBoxInputBar';
import useAuth from '../../../hooks/useAuth';
import { socket } from '../../../API/socket';
import { getLocaleString } from '../../../utils/date';

export interface Message {
  messageId: number;
  isMyMessage: boolean;
  text: string;
  time: string;
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { auth } = useAuth();
  const { publicId, isMaster } = auth!;
  const { campId: campName } = useParams();

  useEffect(() => {
    socket.connect();

    if (isMaster) {
      socket.emit('masterIn', { publicId, campName });
      return () => {
        socket.emit('masterOut', { campName });
        socket.disconnect();
      };
    }

    socket.emit('camperIn', { publicId, campName });
    return () => {
      socket.emit('camperOut', { campName });
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    function onMessage(message: any) {
      const newMessage = {
        messageId: messages.length + 1,
        isMyMessage: false,
        text: message,
        time: getLocaleString(),
      };
      setMessages((prev) => [...prev, newMessage]);
    }
    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, []);

  const handleSubmitMessage = (message: string) => {
    if (isMaster) {
      socket.emit('masterMessage', {
        publicId,
        message,
        campName,
      });
      return;
    }
    socket.emit('camperMessage', {
      publicId,
      message,
      campName,
    });
  };

  return (
    <div className="flex h-screen flex-col p-8">
      <ChatBoxNavBar />
      <ChatBoxMessages messages={messages} />
      <ChatBoxInputBar
        messages={messages}
        setMessages={setMessages}
        onSubmitMessage={handleSubmitMessage}
      />
    </div>
  );
}
