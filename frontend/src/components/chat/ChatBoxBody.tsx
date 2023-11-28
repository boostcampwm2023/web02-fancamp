import ChatBoxMessage from './ChatBoxMessage';
import Spinner from '@components/loading/Spinner';
import { useEffect, useRef } from 'react';
import { Message } from './ChatBox';
import { CHAT_SAVED_MESSAGES_ERROR } from '@constants/chat';

interface Props {
  messages: Message[];
  savedMessages: Message[];
  isLoading: Boolean;
  isError: Boolean;
}

export default function ChatBoxBody({
  isLoading,
  isError,
  savedMessages,
  messages,
}: Props) {
  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastMessageRef && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
      window.scrollTo(0, 0); // temporary fix
    }
  }, [messages]);
  console.log(savedMessages);

  return (
    <div className="flex h-[600px] flex-col-reverse overflow-y-scroll border-l border-r border-border bg-light-yellow">
      <ul className="flex flex-col gap-4 p-8">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : isError ? (
          <div className="flex justify-center">{CHAT_SAVED_MESSAGES_ERROR}</div>
        ) : (
          savedMessages.map(
            ({ chatId, isMyMessage, stringContent, createdAt }) => (
              <ChatBoxMessage
                key={chatId}
                isMyMessage={isMyMessage}
                stringContent={stringContent}
                createdAt={createdAt}
              />
            )
          )
        )}
        {messages.map(
          ({ chatId, isMyMessage, stringContent, createdAt }, index) => (
            <ChatBoxMessage
              key={chatId}
              isMyMessage={isMyMessage}
              stringContent={stringContent}
              createdAt={createdAt}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            />
          )
        )}
      </ul>
    </div>
  );
}
