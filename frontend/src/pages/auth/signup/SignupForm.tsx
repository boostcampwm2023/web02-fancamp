import { useState, useEffect } from 'react';
import { signup } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input/input';
import SubmitButton from '../../../components/button/submitButton';
import useAuth from '../../../hooks/useAuth';

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/error', {
        state: { error: '회원가입을 하시려면 로그아웃을 먼저 해주세요! 😉' },
      });
    }
  }, []);

  const handleBlurEmail = () => {
    const isCorrectEmailFormat = emailRegex.test(email);
    setEmailError(!isCorrectEmailFormat);
    setSignupError(false);
  };

  const handleBlurPassword = () => {
    const isCorrectPasswordLength =
      password.length >= 4 && password.length <= 20;
    setPasswordError(!isCorrectPasswordLength);
    setSignupError(false);
  };

  const handleBlurUsername = () => {
    const isCorrectUsernameLength =
      username.length >= 4 && username.length <= 20;
    setUsernameError(!isCorrectUsernameLength);
    setSignupError(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailError || passwordError || usernameError) {
      return;
    }
    try {
      const response = await signup(email, password, username);
      setAuth(response);
      navigate('/');
    } catch (error) {
      setSignupError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-4 border p-[3rem]"
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
      <Input
        label="닉네임"
        type="text"
        setValue={setUsername}
        onBlur={handleBlurUsername}
      />
      {usernameError && (
        <div className="mb-4 text-error display-regular-14">
          닉네임의 글자 수는 4~20 사이여야 합니다!
        </div>
      )}
      <SubmitButton text="회원가입" />
      {signupError && (
        <div className="mt-4 text-error display-regular-14">
          회원가입에 실패했습니다!
        </div>
      )}
    </form>
  );
}
