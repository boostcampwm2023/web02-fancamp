import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from '../../../components/ui/Input';
import SubmitButton from '../../../components/Button/SubmitButton';
import Text from '../../../components/ui/Text';
import { auth as authConstants } from '../../../utils/constants';
import { validateSign } from '../../../utils/validate';
import LineProgress from '../../../components/Progress/LineProgress';

interface SigninFormProps {
  email: string;
  password: string;
  status: {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SigninForm({
  email,
  password,
  status,
  setEmail,
  setPassword,
  handleSubmit,
}: SigninFormProps) {
  const [isEmailOk, setEmailOk] = useState(true);
  const [isPasswordOk, setPasswordOk] = useState(true);

  const handleBlurEmail = () => {
    const validateEmail = validateSign.isEmailOk(email);
    setEmailOk(validateEmail);
  };

  const handleBlurPassword = () => {
    const validatePassword = validateSign.isPasswordOk(password);
    setPasswordOk(validatePassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex h-[35rem] w-[20rem] flex-col gap-xl border-sm border-text-primary bg-surface-primary pb-xl pl-lg pr-lg pt-xl center"
    >
      <LineProgress maxStep={1} currentStep={0} className="absolute top-[0]" />
      <Text size={20} className="text-center">
        로그인
      </Text>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-md">
          <Input
            label="이메일"
            type="email"
            setValue={setEmail}
            placeholder="fancamp@naver.com"
            errorMessage={!isEmailOk ? authConstants.signin.error.email : ''}
            onBlur={handleBlurEmail}
          />
          <Input
            label="비밀번호"
            type="password"
            setValue={setPassword}
            errorMessage={
              !isPasswordOk ? authConstants.signin.error.password : ''
            }
            onBlur={handleBlurPassword}
          />
        </div>
        <div className="flex flex-col gap-md">
          <SubmitButton
            text="로그인"
            isPending={status.isPending}
            isError={status.isError}
            isSuccess={status.isSuccess}
            errorMessage="이메일 또는 비밀번호가 일치하지 않습니다."
          />
          <div className="flex justify-center gap-sm">
            <Text size={12} color="text-secondary">
              {authConstants.signin.induce.signup.text}
            </Text>
            <Link to="/auth/signup" className="flex">
              <Text size={12} color="point-blue">
                {authConstants.signin.induce.signup.link}
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
