import {
  useMutation,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Camp } from '@type/api/camp';
import { Post } from '@type/api/post';
import { MutationProps } from '@type/api/api';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

interface UpdateCampMutationFnProps {
  campName: string;
  formData: FormData;
}

export const getCampQuery = (campId: string) => {
  const { data, isError, isLoading } = useSuspenseQuery<Camp>({
    queryKey: ['camp', campId],
    queryFn: () =>
      useFetch(`${BASE_URL}/camps/${campId}`, {
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
      useFetch(`${BASE_URL}/posts/camps/${campId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};

export const updateCampMutation = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ campName, formData }: UpdateCampMutationFnProps) =>
      useFetch(`${BASE_URL}/camps/${campName}`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const getAllCampsInfiniteQuery = () => {
  const { data, fetchNextPage, isFetching } = useSuspenseInfiniteQuery<any>({
    queryKey: ['camps'],
    queryFn: ({ pageParam = 0 }) =>
      useFetch(`${BASE_URL}/camps?cursor=${pageParam}`, {
        method: 'GET',
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
    gcTime: 0,
    staleTime: 0,
  });

  return { data, fetchNextPage, isFetching };
};
