import ChatBoxMessage from './ChatBoxMessage';
import Spinner from '@components/loading/Spinner';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useEffect, useRef, Fragment } from 'react';
import { Message } from './ChatBox';
import { getFullDateString } from '@utils/date';

interface Props {
  messages: Message[];
  infiniteData: any;
  status: string;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: any;
  isFetching: boolean;
}

export default function ChatBoxBody({
  messages,
  infiniteData,
  status,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  isFetching,
}: Props) {
  const newMessageRef = useRef<HTMLLIElement>(null);
  const topMessageRef = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (newMessageRef && newMessageRef.current) {
      newMessageRef.current.scrollIntoView();
      window.scrollTo(0, 0);
    }
  }, [messages]);

  const infiniteMessages: Message[] = infiniteData?.pages
    ? infiniteData.pages
        .map((page: any) => page.result)
        .flat()
        .reverse()
    : [];

  const dateMap = new Map<string, number>();
  const idSet = new Set<number>();
  [...infiniteMessages, ...messages].forEach(({ chatId, createdAt }) => {
    const date = new Date(createdAt).toLocaleDateString();
    if (!dateMap.has(date)) {
      dateMap.set(date, chatId);
      idSet.add(chatId);
    }
  });

  return (
    <div className="flex h-[600px] flex-col-reverse overflow-y-scroll border-l border-r">
      <ul className="flex flex-col gap-4 p-8">
        {isFetchingNextPage && (
          <>
            <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
              <Spinner width={64} height={64} />
            </div>
          </>
        )}
        {status === 'pending' ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner width={64} height={64} />
          </div>
        ) : (
          infiniteMessages.map(
            (
              {
                chatId,
                stringContent,
                createdAt,
                chatName: senderChatName,
              }: Message,
              index: number
            ) => (
              <Fragment key={chatId}>
                {idSet.has(chatId) && (
                  <div className="my-8 text-center display-regular-16">
                    {getFullDateString(createdAt)}
                  </div>
                )}
                <ChatBoxMessage
                  ref={index === 0 ? topMessageRef : null}
                  stringContent={stringContent}
                  createdAt={createdAt}
                  senderChatName={senderChatName}
                />
              </Fragment>
            )
          )
        )}
        {messages.map(
          (
            {
              chatId,
              stringContent,
              createdAt,
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
                ref={index === messages.length - 1 ? newMessageRef : null}
              />
            </Fragment>
          )
        )}
      </ul>
    </div>
  );
}
