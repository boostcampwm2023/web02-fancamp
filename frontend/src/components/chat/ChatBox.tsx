import ChatBoxNavBar from './ChatBoxNavBar';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInputBar from './ChatBoxInputBar';
import ChatBoxToast from './ChatBoxToast';
import useChatSocket from '@hooks/useChatSocket';
import useAuth from '@hooks/useAuth';
import { useParams } from 'react-router';
import { chatSocket as socket } from '@API/socket';
import {
  CHAT_CONNECT_TOAST_MESSAGE,
  CHAT_CONNECT_TOAST_DELAY,
} from '@constants/chat';
import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '@API/chat';
import { CHAT_MESSAGES } from '@constants/queryKeys';

export interface Message {
  chatId: number;
  isMyMessage: boolean;
  stringContent: string;
  createdAt: string;
}

export default function ChatBox() {
  const { auth } = useAuth();
  const { publicId, isMaster } = auth!;
  const { campId: campName } = useParams();
  const {
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
    data: savedMessages,
  } = useQuery({
    queryKey: [CHAT_MESSAGES, campName],
    queryFn: () => fetchMessages(campName),
  });
  const { messages, setMessages, isConnected, handleSubmitMessage } =
    useChatSocket({
      isMaster,
      publicId,
      campName,
      socket,
    });

  return (
    <div id="#chatbox" className="flex h-[900px] flex-col p-8">
      <ChatBoxNavBar />
      <ChatBoxBody
        isLoading={isLoadingMessages}
        isError={isErrorMessages}
        savedMessages={savedMessages}
        messages={messages}
      />
      <ChatBoxInputBar
        messages={messages}
        setMessages={setMessages}
        onSubmitMessage={handleSubmitMessage}
      />
      {isConnected && (
        <ChatBoxToast duration={CHAT_CONNECT_TOAST_DELAY}>
          {CHAT_CONNECT_TOAST_MESSAGE}
        </ChatBoxToast>
      )}
    </div>
  );
}
