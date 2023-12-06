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
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInfiniteMessages } from '@API/chat';
import { CHAT_MESSAGES } from '@constants/queryKeys';
import { getCurrentDateString } from '@utils/date';

export default function ChatBox() {
  const { auth } = useAuth();
  const { publicId, isMaster } = auth!;
  const { campId: campName } = useParams();
  const {
    messages,
    setMessages,
    isConnected,
    isMasterOnline,
    handleSubmitMessage,
  } = useChatSocket({
    isMaster,
    publicId,
    campName,
    socket,
  });
  const {
    data: infiniteData,
    status,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [CHAT_MESSAGES, campName],
    queryFn: ({ pageParam }) => fetchInfiniteMessages({ campName, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: getCurrentDateString(),
    staleTime: 1000 * 60 * 1,
    retry: false,
  });

  return (
    <>
      <div id="#chatbox" className="relative flex flex-col">
        <ChatBoxNavBar isMaster={isMaster} isMasterOnline={isMasterOnline} />
        <ChatBoxBody
          messages={messages}
          infiniteData={infiniteData}
          status={status}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
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
    </>
  );
}
