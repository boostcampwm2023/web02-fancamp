import { Auth } from '../types/api/auth';

export async function signin(email: string, password: string): Promise<Auth> {
  const response = await fetch('/api/auth/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('로그인 실패');
  }
  const result = response.json();
  return result;
}

export async function signup(
  email: string,
  password: string,
  chatname: string
): Promise<Auth> {
  const response = await fetch('/api/auth/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      chatname,
      profileImage: '',
      isMaster: true,
    }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('회원가입 실패');
  }
  const result = response.json();
  return result;
}

export async function isValidSession(): Promise<Auth> {
  const response = await fetch('/api/auth/users', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('유효한 세션이 아닙니다');
  }
  const result = response.json();
  return result;
}
