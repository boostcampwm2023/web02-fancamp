import { useState } from 'react';

export default function SigninForm() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmailAddress(e.target.value);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col p-md m-sm gap-sm border'
    >
      <label className='flex flex-col'>
        <span>이메일</span>
        <input
          className='flex-1 mt-2 bg-gray-100 p-xs rounded'
          value={emailAddress}
          type='email'
          placeholder='abc@email.com'
          onChange={handleEmailAddress}
        />
      </label>
      <label className='flex flex-col'>
        <span>비밀번호</span>
        <input
          className='flex-1 mt-2 bg-gray-100 p-xs rounded'
          value={password}
          type='password'
          onChange={handlePassword}
        />
      </label>
      <button
        className='text-white font-bold bg-point-green p-sm rounded'
        type='submit'
      >
        로그인
      </button>
    </form>
  );
}
