import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { BASE_URL } from '@constants/URLs';
import { MutationProps } from '@type/api/api';
import useFetch from './useFetch';

interface SubscribeMutation {
  campId: string;
}

export const getCampSubscriptionQuery = (campName: string) => {
  const { data, isError, isLoading } = useSuspenseQuery<any>({
    queryKey: ['camp', 'subscription', campName],
    queryFn: () =>
      useFetch(`${BASE_URL}/camps/${campName}/subscriptions`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};

export const subscribeMutation = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ campId }: SubscribeMutation) =>
      fetch(`${BASE_URL}/camps/${campId}/subscriptions`, {
        method: 'POST',
        credentials: 'include',
      }).then((res) => res.ok),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const unsubscribeMutation = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ campId }: SubscribeMutation) =>
      useFetch(`${BASE_URL}/camps/${campId}/subscriptions`, {
        method: 'DELETE',
        credentials: 'include',
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};
