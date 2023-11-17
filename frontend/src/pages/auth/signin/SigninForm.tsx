import { useState } from 'react';
import { login } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input/input';
import SubmitButton from '../../../components/button/submitButton';

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export default function SigninForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signinError, setSigninError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    try {
      await login(email, password);
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
        <div className="display-regular-14 mb-4 text-error">
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
        <div className="display-regular-14 mb-4 text-error">
          비밀번호의 글자 수는 4~20 사이여야 합니다!
        </div>
      )}
      <SubmitButton text="로그인" />
      {signinError && (
        <div className="display-regular-14 mt-4 text-error">
          로그인에 실패했습니다!
        </div>
      )}
    </form>
  );
}
