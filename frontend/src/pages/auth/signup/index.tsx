import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from './SignupForm';
import useAuth from '../../../hooks/useAuth';
import { validateSign } from '../../../utils/validate';
import { signup } from '../../../API/auth';
import { EmailStatus, SignupStatus } from '../../../types/client/auth';

interface SignStatus {
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
  const [profileImage, _] = useState<string>('');
  const [isMaster, setMaster] = useState<boolean>(false);
  const [isEmailOk, setEmailOk] = useState<EmailStatus>('ok');
  const [signStatus, setSignStatus] = useState<SignStatus>({
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

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
      setSignStatus({
        isPending: true,
        isError: false,
        isSuccess: false,
      });
      try {
        // await checkEmail(email);
        setStatus('password');
        setSignStatus({
          isPending: false,
          isError: false,
          isSuccess: true,
        });
      } catch (error) {
        setEmailOk('duplicatedError');
        setSignStatus({
          isPending: false,
          isError: true,
          isSuccess: false,
        });
      }
    } else if (signupStatus === 'password') {
      const validatePassword = validateSign.isPasswordOk(password);
      const validateConfirmPassword = password === confirmPassword;
      if (validatePassword && validateConfirmPassword) {
        setStatus('profile');
      }
    } else if (signupStatus === 'profile') {
      // 관련 상태 검증 규칙 추가하기
      setSignStatus({
        isPending: true,
        isError: false,
        isSuccess: false,
      });
      try {
        const resAuth = await signup(
          email,
          password,
          chatName,
          publicId,
          profileImage,
          isMaster
        );
        setAuth(resAuth);
        setStatus('finish');
        setSignStatus({
          isPending: false,
          isError: false,
          isSuccess: true,
        });
      } catch (error) {
        setSignStatus({
          isPending: false,
          isError: true,
          isSuccess: false,
        });
      }
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
        status={signStatus}
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
