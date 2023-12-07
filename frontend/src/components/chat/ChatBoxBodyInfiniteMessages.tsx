import useIntersectionObserver from '@hooks/useIntersectionObserver';
import Spinner from '@components/loading/Spinner';
import ChatBoxMessage from './ChatBoxMessage';
import { fetchInfiniteMessages } from '@API/chat';
import { CHAT_MESSAGES } from '@constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useMemo, Fragment } from 'react';
import { getCurrentDateString, getFullDateString } from '@utils/date';
import { Message } from '@type/api/chat';
import { getFirstMessageIdForDate } from './ChatBoxBodySocketMessages';

export default function ChatBoxBodyInfiniteMessages() {
  const { campId: campName } = useParams();

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

  const topMessageRef = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
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
    [infiniteData]
  );

  return (
    <>
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
                ref={index === 0 ? topMessageRef : null}
                stringContent={stringContent}
                createdAt={createdAt}
                profileImage={profileImage}
                senderChatName={senderChatName}
              />
            </Fragment>
          )
        )
      )}
    </>
  );
}
