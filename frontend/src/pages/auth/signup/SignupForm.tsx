/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../../components/input/input';
import SubmitButton from '../../../components/button/submitButton';
import { auth as authConstants } from '../../../utils/constants';
import LineProgress from '../../../components/progress/lineProgress';
import Text from '../../../components/text/text';
import ProfileImage from '../../../components/image/profileImage';
import { validateSign } from '../../../utils/validate';
import { EmailStatus, SignupStatus } from '../../../types/client/auth';
import Checkbox from '../../../components/checkbox/checkbox';

interface SignupFormProps {
  signupStatus: SignupStatus;
  email: string;
  password: string;
  confirmPassword: string;
  chatName: string;
  publicId: string;
  // profileImage: string;
  isMaster: boolean;
  isEmailOk: EmailStatus;
  status: {
    isPending: boolean;
    isError: boolean;
    isSuccess: boolean;
  };
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  setChatName: React.Dispatch<React.SetStateAction<string>>;
  setPublicId: React.Dispatch<React.SetStateAction<string>>;
  // setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  setMaster: React.Dispatch<React.SetStateAction<boolean>>;
  setEmailOk: React.Dispatch<React.SetStateAction<EmailStatus>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignupForm({
  signupStatus,
  email,
  password,
  confirmPassword,
  chatName,
  publicId,
  status,
  isMaster,
  isEmailOk,
  setEmail,
  setPassword,
  setConfirmPassword,
  setChatName,
  setPublicId,
  setMaster,
  setEmailOk,
  handleSubmit,
}: SignupFormProps) {
  const [isPasswordOk, setPasswordOk] = useState<boolean>(true);
  const [isConfirmPasswordOk, setConfirmPasswordOk] = useState<boolean>(true);
  const [isChatNameOk, setChatNameOk] = useState<boolean>(true);
  const [isPublicIdOk, setPublicIdOk] = useState<boolean>(true);
  // const [isProfileImageOk, setProfileImageOk] = useState<boolean>(true);

  const handleBlurEmail = () => {
    const validateEmail = validateSign.isEmailOk(email);
    setEmailOk(validateEmail ? 'ok' : 'formatError');
  };

  const handleBlurPassword = () => {
    const validatePassword = validateSign.isPasswordOk(password);
    setPasswordOk(validatePassword);
  };

  const handleBlurConfirmPassword = () => {
    const validateConfirmPassword = password === confirmPassword;
    setConfirmPasswordOk(validateConfirmPassword);
  };

  const handleBlurChatName = () => {
    // ChatName 규칙 정한 뒤 검증 과정 추가하기
    setChatNameOk(true);
  };

  const handleBlurPublicId = () => {
    // PublicId 규칙 정한 뒤 검증 과정 추가하기
    setPublicIdOk(true);
  };

  const handleCheckMaster = () => {
    setMaster(!isMaster);
  };

  return (
    <form
      className="relative flex h-[35rem] w-[20rem] flex-col gap-xl border-sm border-text-primary bg-surface-primary pb-xl pl-lg pr-lg pt-xl center"
      onSubmit={handleSubmit}
    >
      <LineProgress
        maxStep={Object.keys(authConstants.signup.step).length - 1}
        currentStep={authConstants.signup.step[signupStatus].stepIndex}
        className="absolute left-[0] top-[0]"
      />
      <Text size={20} className="text-center">
        {authConstants.signup.step[signupStatus].title}
      </Text>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-1 flex-col">
          {signupStatus === 'email' ? (
            <Input
              label="이메일"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="fancamp@naver.com"
              errorMessage={
                isEmailOk === 'formatError'
                  ? authConstants.signup.error.email.format
                  : isEmailOk === 'duplicatedError'
                    ? authConstants.signup.error.email.duplicated
                    : ''
              }
              onBlur={handleBlurEmail}
            />
          ) : signupStatus === 'password' ? (
            <div className="flex flex-col gap-md">
              <Input
                label="비밀번호"
                type="password"
                value={password}
                setValue={setPassword}
                errorMessage={
                  !isPasswordOk ? authConstants.signup.error.password : ''
                }
                onBlur={handleBlurPassword}
              />{' '}
              <Input
                label="비밀번호 확인"
                type="password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                errorMessage={
                  !isConfirmPasswordOk
                    ? authConstants.signup.error.confirmPassword
                    : ''
                }
                onBlur={handleBlurConfirmPassword}
              />
            </div>
          ) : signupStatus === 'profile' ? (
            <div className="flex flex-col gap-md">
              <ProfileImage
                className="relative h-center"
                src="https://i.namu.wiki/i/KrUJMMXswt0EEr9HwEVQmDpsVxQtbidLBC1Wj_B7NlJuH2CYa2lRBMqHJPuA8a-Q0hpSZ6YV_RR684e961T0Cw.webp"
              />
              <Input
                label="닉네임"
                type="text"
                value={chatName}
                setValue={setChatName}
                errorMessage={!isChatNameOk ? '다시 작성' : ''}
                onBlur={handleBlurChatName}
              />
              <Input
                label="아이디"
                type="text"
                value={publicId}
                setValue={setPublicId}
                errorMessage={!isPublicIdOk ? '다시 작성' : ''}
                onBlur={handleBlurPublicId}
              />
              <Checkbox checked={isMaster} onClick={handleCheckMaster}>
                <Text size={14} color="text-secondary">
                  마스터로 가입하기
                </Text>
              </Checkbox>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-col gap-md">
          <SubmitButton
            text={authConstants.signup.step[signupStatus].apply}
            isPending={status.isPending}
            isError={status.isError}
            isSuccess={status.isSuccess}
            errorMessage="이메일 또는 비밀번호가 일치하지 않습니다."
          />
          <div className="flex justify-center gap-sm">
            <Text size={12} color="text-secondary">
              {authConstants.signup.induce.signin.text}
            </Text>
            <Link to="/auth/signin" className="flex">
              <Text size={12} color="point-blue">
                {authConstants.signup.induce.signin.link}
              </Text>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
