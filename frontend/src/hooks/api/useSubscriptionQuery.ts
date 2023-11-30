import { useSuspenseQuery } from '@tanstack/react-query';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

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

// export const deleteLikeMutation = ({ onSuccess, onError }: MutationProps) => {
//   const { mutate, isPending, isError, isSuccess } = useMutation({
//     mutationFn: ({ postId }: PostLikeMutationFnProps) =>
//       useFetch(`${BASE_URL}/posts/${postId}/likes`, {
//         method: 'DELETE',
//         credentials: 'include',
//       }),
//     onSuccess,
//     onError,
//   });

//   return { mutate, isPending, isError, isSuccess };
// };
