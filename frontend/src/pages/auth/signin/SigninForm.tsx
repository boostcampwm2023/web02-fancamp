import { useState, useEffect } from 'react';
import { signin } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input/input';
import SubmitButton from '../../../components/button/submitButton';
import useAuth from '../../../hooks/useAuth';

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signinError, setSigninError] = useState(false);

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/error', {
        state: { error: '이미 로그인 하셨어요! 😉' },
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    try {
      const response = await signin(email, password);
      setAuth(response);
      navigate('/');
    } catch (error) {
      setPassword('');
      setSigninError(true);
    }
  };

  const handleBlurEmail = () => {
    const isCorrectEmailFormat = emailRegex.test(email);
    setEmailError(!isCorrectEmailFormat);
    setSigninError(false);
  };

  const handleBlurPassword = () => {
    const isCorrectPasswordLength =
      password.length >= 4 && password.length <= 20;
    setPasswordError(!isCorrectPasswordLength);
    setSigninError(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-sm border p-[3rem]"
    >
      <Input
        label="이메일"
        type="email"
        setValue={setEmail}
        placeholder="fancamp@naver.com"
        onBlur={handleBlurEmail}
      />
      {emailError && (
        <div className="mb-4 text-error display-regular-14">
          이메일의 형식이 맞지 않아요!
        </div>
      )}
      <Input
        label="비밀번호"
        type="password"
        setValue={setPassword}
        onBlur={handleBlurPassword}
      />
      {passwordError && (
        <div className="mb-4 text-error display-regular-14">
          비밀번호의 글자 수는 4~20 사이여야 합니다!
        </div>
      )}
      <SubmitButton text="로그인" />
      {signinError && (
        <div className="mt-4 text-error display-regular-14">
          로그인에 실패했습니다!
        </div>
      )}
    </form>
  );
}
