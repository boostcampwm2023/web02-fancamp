import {
  InfiniteData,
  useMutation,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
import { CommentResponse } from '@type/api/comment';
import { MutationProps } from '@type/api/api';
import { BASE_URL } from '@constants/URLs';
import { queryClient } from '@contexts/QueryProvider';
import { useCallback } from 'react';
import useFetch from './useFetch';

interface PostCommentMutationFnProps {
  postId: number;
  content: string;
}

interface DeleteCommentMutationFnProps {
  postId: number;
  commentId: number;
}

export const getCommentsInfiniteQuery = (postId: number) => {
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
      gcTime: 0,
      staleTime: 0,
    });

  const updateQueryData = (commentId: number) => {
    queryClient.setQueryData<InfiniteData<Array<any>>>(
      ['comments', postId],
      (oldData: any) => {
        const newData = data.pages.map((page) => {
          return {
            ...page,
            result: page.result.filter((item) => item.commentId !== commentId),
          };
        });
        return { ...oldData, pages: newData };
      }
    );
  };

  return { data, isFetching, fetchNextPage, updateQueryData };
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

export const deleteCommentMutation = ({
  onError,
  onSuccess,
}: MutationProps) => {
  const {
    mutate: oldMutate,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ postId, commentId }: DeleteCommentMutationFnProps) =>
      useFetch(`${BASE_URL}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
      }),
    onSuccess,
    onError,
  });

  const mutate = useCallback(oldMutate, [oldMutate]);

  return { mutate, isPending, isError, isSuccess };
};
