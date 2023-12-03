import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommentResponse } from '@type/api/comment';
import { MutationProps } from '@type/api/api';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

interface PostCommentMutationFnProps {
  postId: string;
  content: string;
}

export const getCommentsInfiniteQuery = (postId: string) => {
  const { data, fetchNextPage, isFetching } =
    useSuspenseInfiniteQuery<CommentResponse>({
      queryKey: ['comments', postId],
      queryFn: ({ pageParam = new Date() }) => {
        return useFetch(
          `${BASE_URL}/posts/${postId}/comments?cursor=${pageParam}`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
      },
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: new Date(),
      gcTime: 3000,
      staleTime: 0,
    });

  return { data, isFetching, fetchNextPage };
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
