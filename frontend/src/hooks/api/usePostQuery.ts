import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Post } from '@type/api/post';
import { MutationProps } from '@type/api/api';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

interface PostPostMutationFnProps {
  formData: FormData;
}

export const getPostQuery = (postId: string) => {
  const { data, isError, isLoading } = useSuspenseQuery<Post>({
    queryKey: ['post', postId],
    queryFn: () =>
      useFetch(`${BASE_URL}/posts/${postId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 3000,
  });

  return { data, isError, isLoading };
};

export const postPostMutation = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ formData }: PostPostMutationFnProps) =>
      useFetch(`${BASE_URL}/posts/`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};
