import { useState } from 'react';

export default function SignupForm() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmailAddress(e.target.value);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col p-8 m-4 gap-4 border'
    >
      <label className='flex flex-col'>
        <span>이메일</span>
        <input
          className='flex-1 mt-2 bg-gray-100 p-2 rounded'
          value={emailAddress}
          type='email'
          placeholder='abc@email.com'
          onChange={handleEmailAddress}
        />
      </label>
      <label className='flex flex-col'>
        <span>비밀번호</span>
        <input
          className='flex-1 mt-2 bg-gray-100 p-2 rounded'
          value={password}
          type='password'
          onChange={handlePassword}
        />
      </label>
      <label className='flex flex-col'>
        <span>닉네임</span>
        <input
          className='flex-1 mt-2 bg-gray-100 p-2 rounded'
          value={username}
          type='text'
          placeholder='닉네임'
          onChange={handleUsername}
        />
      </label>
      <button
        className='text-white font-bold bg-green-500 p-4 rounded'
        type='submit'
      >
        가입
      </button>
    </form>
  );
}
