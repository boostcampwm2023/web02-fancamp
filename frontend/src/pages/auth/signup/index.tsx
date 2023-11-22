import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import SignupForm from './SignupForm';
import useAuth from '../../../hooks/useAuth';
import { validateSign } from '../../../utils/validate';
import { checkEmail, signup } from '../../../api/auth';
import { EmailStatus, SignupStatus } from '../../../types/client/auth';

interface SignMutateStatus {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export default function SignupPage() {
  const [signupStatus, setStatus] = useState<SignupStatus>('email');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [chatName, setChatName] = useState<string>('');
  const [publicId, setPublicId] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');
  const [isMaster, setMaster] = useState<boolean>(false);
  const [isEmailOk, setEmailOk] = useState<EmailStatus>('ok');
  const [signMutateStatus, setSignMutateStatus] = useState<SignMutateStatus>({
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  const { auth } = useAuth();
  const navigate = useNavigate();

  const checkEmailMutation = useMutation({
    mutationFn: ({ emailValue }: any) => checkEmail(emailValue),
    onSuccess: () => {
      setStatus('password');
    },
    onError: () => {
      setEmailOk('duplicatedError');
    },
  });

  const signupMutation = useMutation({
    mutationFn: () =>
      signup(email, password, chatName, publicId, profileImage, isMaster),
    onSuccess: () => {
      setStatus('finish');
    },
  });

  useEffect(() => {
    if (auth) {
      navigate('/error', {
        state: { error: '회원가입을 하시려면 로그아웃을 먼저 해주세요! 😉' },
      });
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupStatus === 'email') {
      const validateEmail = validateSign.isEmailOk(email);
      if (!validateEmail) {
        setEmailOk('formatError');
        return;
      }
      // checkEmailMutation.mutate({ emailValue: email });
      setStatus('password');
    } else if (signupStatus === 'password') {
      const validatePassword = validateSign.isPasswordOk(password);
      const validateConfirmPassword = password === confirmPassword;
      if (validatePassword && validateConfirmPassword) {
        setStatus('profile');
      }
    } else if (signupStatus === 'profile') {
      // 관련 상태 검증 규칙 추가하기
      signupMutation.mutate();
    } else if (signupStatus === 'finish') {
      navigate('/');
    }
  };

  return (
    <div className="h-[100vh] w-full  bg-[#F4F0E1]">
      <SignupForm
        signupStatus={signupStatus}
        email={email}
        password={password}
        confirmPassword={confirmPassword}
        chatName={chatName}
        publicId={publicId}
        // profileImage={profileImage}
        isMaster={isMaster}
        isEmailOk={isEmailOk}
        status={signMutateStatus}
        setEmail={setEmail}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        setChatName={setChatName}
        setPublicId={setPublicId}
        setEmailOk={setEmailOk}
        // setProfileImage={setProfileImage}
        setMaster={setMaster}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
