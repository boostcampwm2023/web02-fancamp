import { Auth } from '@type/api/auth';

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
  const result = await response.json();
  return result;
}

export async function checkEmail(email: string): Promise<boolean> {
  const response = await fetch('/api/auth/users/rightEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
    }),
  });
  if (!response.ok) {
    throw new Error('중복된 이메일');
  }
  return true;
}

export async function signup(
  email: string,
  password: string,
  chatName: string,
  publicId: string,
  profileImage: string,
  isMaster: boolean
): Promise<Auth> {
  const response = await fetch('/api/auth/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      chatName,
      publicId,
      profileImage,
      isMaster,
    }),
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('회원가입 실패');
  }
  const result = await response.json();
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
  const result = await response.json();
  return result;
}

export async function signout(): Promise<any> {
  const response = await fetch('/api/auth/users/signout', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('로그아웃 실패');
  }
}
