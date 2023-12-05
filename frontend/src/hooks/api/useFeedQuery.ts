import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

export const getFeedInfiniteQuery = () => {
  const { data, fetchNextPage, isFetching } = useSuspenseInfiniteQuery<any>({
    queryKey: ['feed'],
    queryFn: ({ pageParam = new Date() }) =>
      useFetch(`${BASE_URL}/posts?cursor=${pageParam}`),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: new Date(),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isFetching, fetchNextPage };
};
