import useIntersectionObserver from '@hooks/useIntersectionObserver';
import ChatBoxMessage from './ChatBoxMessage';
import Spinner from '@components/loading/Spinner';
import { useParams } from 'react-router-dom';
import { Message } from '@type/api/chat';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchInfiniteMessages } from '@API/chat';
import { getCurrentDateString, getFullDateString } from '@utils/date';
import { Fragment, useEffect, useMemo, useRef } from 'react';
import { CHAT_MESSAGES } from '@constants/queryKeys';

interface Props {
  messages: Message[];
}

export default function ChatBoxBody({ messages }: Props) {
  const { campId: campName } = useParams();
  const newMessageRef = useRef<HTMLLIElement>(null);
  const topMessageRef = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (newMessageRef && newMessageRef.current) {
      newMessageRef.current.scrollIntoView({
        block: 'end',
      });
    }
  }, [messages]);

  const {
    data: infiniteData,
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

  const infiniteMessages: Message[] = useMemo(
    () =>
      infiniteData
        ? infiniteData.pages
            .map((page: any) => page.result)
            .flat()
            .reverse()
        : [],
    [infiniteData]
  );

  const idSet = useMemo(
    () => getFirstMessageIdForDate(infiniteMessages),
    [infiniteData, messages]
  );

  return (
    <div className="flex h-[calc(100vh-450px)] flex-col-reverse overflow-y-scroll border border-contour-primary">
      <ul className="flex flex-col gap-4 p-8">
        {isFetchingNextPage && (
          <div className="absolute left-1/2 top-1/4 -translate-x-1/2">
            <Spinner width={64} height={64} />
          </div>
        )}
        {[...infiniteMessages, ...messages].map(
          (
            {
              chatId,
              stringContent,
              createdAt,
              profileImage,
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
                ref={
                  index === 0
                    ? topMessageRef
                    : index === messages.length + infiniteMessages.length - 1
                      ? newMessageRef
                      : null
                }
                stringContent={stringContent}
                createdAt={createdAt}
                profileImage={profileImage}
                senderChatName={senderChatName}
              />
            </Fragment>
          )
        )}
      </ul>
    </div>
  );
}

function getFirstMessageIdForDate(messages: Message[]): Set<number> {
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
