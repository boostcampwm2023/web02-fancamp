import ChatBoxMessage from './ChatBoxMessage';
import { Fragment, useMemo, useRef, useEffect } from 'react';
import { getFullDateString } from '@utils/date';
import { Message } from '@type/api/chat';

interface Props {
  messages: Message[];
}

export default function ChatBoxBodySocketMessages({ messages }: Props) {
  const newMessageRef = useRef<HTMLLIElement>(null);
  const idSet = useMemo(() => getFirstMessageIdForDate(messages), [messages]);

  useEffect(() => {
    if (newMessageRef && newMessageRef.current) {
      newMessageRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <>
      {messages.map(
        (
          {
            chatId,
            stringContent,
            createdAt,
            profileImage,
            chatName: senderChatName,
          }: Message,
          index
        ) => (
          <Fragment key={chatId}>
            {idSet.has(chatId) && (
              <div className="my-8 text-center display-regular-16">
                {getFullDateString(createdAt)}
              </div>
            )}
            <ChatBoxMessage
              key={chatId}
              stringContent={stringContent}
              createdAt={createdAt}
              senderChatName={senderChatName}
              profileImage={profileImage}
              ref={index === messages.length - 1 ? newMessageRef : null}
            />
          </Fragment>
        )
      )}
    </>
  );
}

export function getFirstMessageIdForDate(messages: Message[]): Set<number> {
  const idSet = new Set<number>();
  const dateMap = new Map<string, number>();
  messages.forEach(({ chatId, createdAt }) => {
    const date = new Date(createdAt).toLocaleDateString();
    if (!dateMap.has(date)) {
      dateMap.set(date, chatId);
      idSet.add(chatId);
    }
  });
  return idSet;
}
