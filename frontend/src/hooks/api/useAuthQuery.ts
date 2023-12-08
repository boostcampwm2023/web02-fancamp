import { BASE_URL } from '@constants/URLs';
import { useMutation } from '@tanstack/react-query';
import { MutationProps } from '@type/api/api';
import useFetch from './useFetch';

interface ValidateEmailMutateProps {
  email: string;
}

interface ValidatePublicIdMutateProps {
  publicId: string;
}

interface CreateUserMutateProps {
  email: string;
  password: string;
  chatName: string;
  publicId: string;
  profileImage: string;
  isMaster: boolean;
}

export const validateEmailMutate = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ email }: ValidateEmailMutateProps) =>
      useFetch(`${BASE_URL}/auth/users/duplicateEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const validatePublicIdMutate = ({
  onSuccess,
  onError,
}: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({ publicId }: ValidatePublicIdMutateProps) =>
      useFetch(`${BASE_URL}/auth/users/duplicatePublicId`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};

export const createUserMutate = ({ onSuccess, onError }: MutationProps) => {
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: ({
      email,
      password,
      chatName,
      isMaster,
      profileImage,
      publicId,
    }: CreateUserMutateProps) =>
      useFetch(`${BASE_URL}/auth/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
          chatName,
          isMaster,
          profileImage: profileImage || '',
          publicId,
        }),
      }),
    onSuccess,
    onError,
  });

  return { mutate, isPending, isError, isSuccess };
};
