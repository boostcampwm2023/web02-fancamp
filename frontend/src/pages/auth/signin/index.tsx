import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import SigninForm from './SigninForm';
import useAuth from '../../../hooks/useAuth';
import { validateSign } from '../../../utils/validate';
import { signin } from '../../../api/auth';

interface SignMutateStatus {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export default function SigninPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [signMutateStatus, setSignMutateStatus] = useState<SignMutateStatus>({
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const signinMutation = useMutation({
    mutationFn: () => signin(email, password),
    onSuccess: (data) => {
      setAuth(data);
      navigate('/');
    },
  });

  useEffect(() => {
    if (auth) {
      navigate('/error', {
        state: { error: '이미 로그인 하셨어요! 😉' },
      });
    }
  }, []);

  useEffect(() => {
    setSignMutateStatus({
      isPending: signinMutation.isPending,
      isError: signinMutation.isError,
      isSuccess: signinMutation.isSuccess,
    });
  }, [
    signinMutation.isPending,
    signinMutation.isError,
    signinMutation.isSuccess,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validateEmail = validateSign.isEmailOk(email);
    const validatePassword = validateSign.isPasswordOk(password);
    if (!validateEmail || !validatePassword) {
      return;
    }
    signinMutation.mutate();
  };

  return (
    <div className="h-[100vh] w-full  bg-[#F4F0E1]">
      <SigninForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        status={signMutateStatus}
      />
    </div>
  );
}
