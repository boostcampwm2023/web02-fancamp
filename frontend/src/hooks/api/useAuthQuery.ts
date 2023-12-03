import { BASE_URL } from '@constants/URLs';
import { useQuery } from '@tanstack/react-query';
import useFetch from './useFetch';

export const validateEmailQuery = (email: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['email', email],
    queryFn: () =>
      useFetch(`${BASE_URL}/auth/users/duplicateEmail`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ email }),
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};
