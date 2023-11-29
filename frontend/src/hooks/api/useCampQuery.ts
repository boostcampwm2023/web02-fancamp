import { useSuspenseQuery } from '@tanstack/react-query';
import { Camp } from '@type/api/camp';
import { Post } from '@type/api/post';
import useFetch from './useFetch';

export const getCampQuery = (campId: string) => {
  const { data, isError, isLoading } = useSuspenseQuery<Camp>({
    queryKey: ['camp', campId],
    queryFn: () =>
      useFetch(`/api/camps/${campId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};

export const getCampPostsQuery = (campId: string) => {
  const { data, isError, isLoading } = useSuspenseQuery<Post[]>({
    queryKey: ['posts', campId],
    queryFn: () =>
      useFetch(`/api/posts/camps/${campId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};
