import ChatBoxNavBar from './ChatBoxNavBar';
import ChatBoxBody from './ChatBoxBody';
import ChatBoxInputBar from './ChatBoxInputBar';
import ChatBoxToast from './ChatBoxToast';
import useChatSocket from '@hooks/useChatSocket';
import useAuth from '@hooks/useAuth';
import useSubscriptions from '@hooks/useSubscriptions';
import ChatBoxSubscription from './ChatBoxSubscribe';
import { useParams } from 'react-router';
import { chatSocket as socket } from '@API/socket';
import {
  CHAT_CONNECT_TOAST_MESSAGE,
  CHAT_CONNECT_TOAST_DELAY,
} from '@constants/chat';

export default function ChatBox() {
  const { auth } = useAuth();
  const { publicId, isMaster } = auth!;
  const { campId: campName } = useParams();
  const { isSubscribedCampName } = useSubscriptions();

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

  if (!isSubscribedCampName(campName!) && !auth?.isMaster) {
    return <ChatBoxSubscription />;
  }

  return (
    <>
      <div id="#chatbox" className="relative flex flex-col">
        <ChatBoxNavBar isMaster={isMaster} isMasterOnline={isMasterOnline} />
        <ChatBoxBody messages={messages} />
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
