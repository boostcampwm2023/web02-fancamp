/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */

import { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupStatus, ValidateStatus } from '@type/client/auth';
import { FetchStatus } from '@type/api/status';
import useAuth from '@hooks/useAuth';
import { validateSign } from '@utils/validate';
import {
  createUserMutate,
  validateEmailMutate,
  validatePublicIdMutate,
} from '@hooks/api/useAuthQuery';
import SignupForm from './SignupForm';

export default function SignupPage() {
  const [signupStatus, setStatus] = useState<SignupStatus>('email');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [chatName, setChatName] = useState<string>('');
  const [publicId, setPublicId] = useState<string>('');
  const [profileImage] = useState<string>('');
  const [isMaster, setMaster] = useState<boolean>(false);
  const [isEmailOk, setEmailOk] = useState<ValidateStatus>('ok');
  const [_, setPublicIdOk] = useState<ValidateStatus>('ok');
  const [signStatus] = useState<FetchStatus>({
    isPending: false,
    isError: false,
    isSuccess: false,
  });
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const { mutate: createUser } = createUserMutate({
    onSuccess: (data) => {
      setAuth(data);
      setStatus('finish');
    },
  });
  const { mutate: validateEmail } = validateEmailMutate({
    onSuccess: (data) => {
      const { duplicateEmail } = data;
      if (duplicateEmail) {
        setEmailOk('duplicatedError');
        return;
      }
      setStatus('password');
    },
  });
  const { mutate: validatePublicId } = validatePublicIdMutate({
    onSuccess: (data) => {
      const { duplicatePublicId } = data;
      if (duplicatePublicId) {
        setPublicIdOk('duplicatedError');
        return;
      }
      createUser({
        email,
        password,
        chatName,
        publicId,
        profileImage,
        isMaster,
      });
    },
  });

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (signupStatus === 'email') {
      validateEmail({ email });
    } else if (signupStatus === 'password') {
      const validatePassword = validateSign.isPasswordOk(password);
      const validateConfirmPassword = password === confirmPassword;
      if (validatePassword && validateConfirmPassword) {
        setStatus('profile');
      }
    } else if (signupStatus === 'profile') {
      validatePublicId({ publicId });
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
