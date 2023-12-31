import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { User } from '@type/api/user';
import { MutationProps } from '@type/api/api';
import { BASE_URL } from '@constants/URLs';
import useFetch from './useFetch';

interface UpdateProfileMutationFnProps {
  formData: FormData;
}

export const getProfileQuery = () => {
  const { data, isError, isLoading } = useSuspenseQuery<User>({
    queryKey: ['user'],
    queryFn: () =>
      useFetch(`${BASE_URL}/users`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};

export const updateProfileMutation = ({
  onSuccess,
  onError,
}: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ formData }: UpdateProfileMutationFnProps) =>
      useFetch(`${BASE_URL}/users`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const getProfileByIdQuery = (publicId: string) => {
  const { data, isError, isLoading } = useSuspenseQuery<User>({
    queryKey: ['user', publicId],
    queryFn: () =>
      useFetch(`${BASE_URL}/auth/users/profileImage/${publicId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return { data, isError, isLoading };
};
