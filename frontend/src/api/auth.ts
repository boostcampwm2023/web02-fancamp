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
    throw new Error('login fail');
  }
  const result = response.json();
  return result;
}
