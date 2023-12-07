import useFetch from './useFetch';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BASE_URL } from '@constants/URLs';
import { queryClient } from '@contexts/QueryProvider';
import { SUBSCRIBED_CAMPS } from '@constants/queryKeys';
import { Auth } from '@type/api/auth';
import { fetchSubscribedCamps } from '@API/subscriptions';

interface MutationFn {
  campId: string;
}

interface SubscribeMutation {
  publicId: string | undefined;
}

export default function useSubscriptionQuery(auth: Auth | null) {
  const { data: subscribedCamps } = useQuery({
    queryKey: [SUBSCRIBED_CAMPS, auth?.publicId],
    queryFn: fetchSubscribedCamps,
    staleTime: 1000 * 60 * 5,
    enabled: !!(auth !== null && !auth?.isMaster),
  });

  const isSubscribedCampName = (campName: string): boolean => {
    if (
      subscribedCamps?.some(
        ({ campName: subscribedCampName }) => subscribedCampName === campName
      )
    ) {
      return true;
    }
    return false;
  };

  return { subscribedCamps, isSubscribedCampName };
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
