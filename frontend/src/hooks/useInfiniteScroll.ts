import { useEffect, useRef, useState } from 'react';

interface InverseInfiniteScrollProps {
  dataLength: number;
  dataType: 'old' | 'new';
  fetcher: () => Promise<any>;
}

export const useInverseInfiniteScroll = ({
  dataLength,
  dataType,
  fetcher,
}: InverseInfiniteScrollProps) => {
  const [isFetching, setFetching] = useState(true);
  const [currentHeight, setCurrentHeight] = useState<number>(0);
  const [hasNextPage, setNextPage] = useState(true);
  const [isFirstFetch, setFirstFetch] = useState(true);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isTop = (target: HTMLDivElement) => {
    const { scrollTop } = target;
    if (scrollTop < 10) {
      return true;
    }
    return false;
  };

  const isBottom = (target: HTMLDivElement) => {
    const { scrollHeight, clientHeight, scrollTop } = target;
    if (clientHeight + scrollTop + 10 > scrollHeight) {
      return true;
    }
    return false;
  };

  const useFetch = () => {
    if (scrollRef.current) {
      setCurrentHeight(scrollRef.current.scrollHeight);
    }
    fetcher();
    setNextPage(true);
    setFetching(false);
  };

  const handleScrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 9999999, behavior: 'smooth' });
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const scrollHandler = (event: Event) => {
      const { target } = event;
      const currentTarget = target as HTMLDivElement;
      if (isTop(currentTarget)) {
        setFetching(true);
      } else if (isBottom(currentTarget)) {
        setUnreadCount(0);
      }
    };
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', scrollHandler);
      return () => {
        if (scrollRef.current) {
          scrollRef.current.removeEventListener('scroll', scrollHandler);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (isFetching) {
      useFetch();
    } else if (!hasNextPage) {
      setFetching(false);
    }
  }, [isFetching]);

  useEffect(() => {
    if (isFetching === false && scrollRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
      if (dataType === 'old') {
        const newTop =
          scrollHeight -
          (isFirstFetch ? clientHeight : currentHeight - scrollTop);
        scrollRef.current.scrollTo({ top: newTop });
        if (isFirstFetch) {
          setFirstFetch(false);
        }
      } else if (dataType === 'new') {
        const lastElementHeight =
          scrollRef.current.lastElementChild?.clientHeight || 0;
        if (clientHeight + scrollTop + lastElementHeight + 10 > scrollHeight) {
          scrollRef.current.scrollTo({
            top: scrollHeight,
            behavior: 'smooth',
          });
          setUnreadCount(0);
        } else {
          setUnreadCount(unreadCount + 1);
        }
      }
    }
  }, [dataLength]);

  return { ref: scrollRef, unreadCount, handleScrollToBottom };
};
