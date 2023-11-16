export async function login(email: string, password: string): Promise<any> {
  const response = await fetch('/api/auth/user/signin', {
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
  username: string
): Promise<any> {
  const response = await fetch('/api/auth/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      username,
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
