import { BASE_URL } from '@constants/URLs';
import { useMutation } from '@tanstack/react-query';
import { MutationProps } from '@type/api/api';
import useFetch from './useFetch';

interface SearchCampsMutation {
  keyword: string;
}

export const searchCampsMutation = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ keyword }: SearchCampsMutation) =>
      useFetch(`${BASE_URL}/camps/search/${keyword}`),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};
