import useFetch from './useFetch';
import { useMutation } from '@tanstack/react-query';
import { BASE_URL } from '@constants/URLs';
import { queryClient } from '@contexts/QueryProvider';
import { SUBSCRIBED_CAMPS } from '@constants/queryKeys';

interface MutationFn {
  campId: string;
}

interface SubscribeMutation {
  publicId: string | undefined;
}

export const subscribeMutation = ({ publicId }: SubscribeMutation) => {
  const {
    mutate: subscribeMutate,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ campId }: MutationFn) =>
      fetch(`${BASE_URL}/camps/${campId}/subscriptions`, {
        method: 'POST',
        credentials: 'include',
      }).then((res) => res.ok),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIBED_CAMPS, publicId],
      }),
  });

  return { subscribeMutate, isPending, isError, isSuccess };
};

export const unsubscribeMutation = ({ publicId }: SubscribeMutation) => {
  const {
    mutate: unsubscribeMutate,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: ({ campId }: MutationFn) =>
      useFetch(`${BASE_URL}/camps/${campId}/subscriptions`, {
        method: 'DELETE',
        credentials: 'include',
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [SUBSCRIBED_CAMPS, publicId],
      }),
  });

  return { unsubscribeMutate, isPending, isError, isSuccess };
};
