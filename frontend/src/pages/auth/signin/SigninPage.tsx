import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SigninForm from './SigninForm';
import useAuth from '../../../hooks/useAuth';
import { validateSign } from '../../../utils/validate';
import { FetchStatus } from '../../../types/api/status';
import { signin } from '../../../API/auth';

export default function SigninPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [signStatus, setSignStatus] = useState<FetchStatus>({
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (auth) {
      navigate('/error', {
        state: { error: '이미 로그인 하셨어요! 😉' },
      });
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validateEmail = validateSign.isEmailOk(email);
    const validatePassword = validateSign.isPasswordOk(password);
    if (!validateEmail || !validatePassword) {
      return;
    }
    setSignStatus({
      isPending: true,
      isError: false,
      isSuccess: false,
    });
    try {
      const response = await signin(email, password);
      setAuth(response);
      setSignStatus({
        isPending: false,
        isError: false,
        isSuccess: true,
      });
      const redirectUrl = location.state?.redirect;
      navigate(redirectUrl || '/');
    } catch (error) {
      setSignStatus({
        isPending: false,
        isError: true,
        isSuccess: false,
      });
    }
  };

  return (
    <div className="h-[100vh] w-full  bg-[#F4F0E1]">
      <SigninForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        status={signStatus}
      />
    </div>
  );
}
