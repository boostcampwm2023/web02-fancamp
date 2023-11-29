import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Comment } from '@type/api/comment';
import { MutationProps } from '@type/api/api';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

interface PostCommentMutationFnProps {
  postId: string;
  content: string;
}

export const getCommentsQuery = (postId: string) => {
  const { data, isError, isLoading, refetch } = useSuspenseQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () =>
      useFetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading, refetch };
};

export const postCommentMutation = ({ onError, onSuccess }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ postId, content }: PostCommentMutationFnProps) =>
      useFetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
        credentials: 'include',
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};
