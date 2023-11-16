import { useState } from 'react';
import { signup } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input/input';
import SubmitButton from '../../../components/button/submitButton';

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const navigate = useNavigate();

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
      await signup(email, password, username);
      navigate('/');
    } catch (error) {
      setSignupError(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col p-[3rem] mb-4 gap-4 border'
    >
      <Input
        label='이메일'
        type='email'
        setValue={setEmail}
        placeholder='fancamp@naver.com'
        onBlur={handleBlurEmail}
      />
      {emailError && (
        <div className='display-regular-14 text-error mb-4'>
          이메일의 형식이 맞지 않아요!
        </div>
      )}
      <Input
        label='비밀번호'
        type='password'
        setValue={setPassword}
        onBlur={handleBlurPassword}
      />
      {passwordError && (
        <div className='display-regular-14 text-error mb-4'>
          비밀번호의 글자 수는 4~20 사이여야 합니다!
        </div>
      )}
      <Input
        label='닉네임'
        type='text'
        setValue={setUsername}
        onBlur={handleBlurUsername}
      />
      {usernameError && (
        <div className='display-regular-14 text-error mb-4'>
          닉네임의 글자 수는 4~20 사이여야 합니다!
        </div>
      )}
      <SubmitButton text='회원가입' />
      {signupError && (
        <div className='display-regular-14 text-error mt-4'>
          회원가입에 실패했습니다!
        </div>
      )}
    </form>
  );
}
