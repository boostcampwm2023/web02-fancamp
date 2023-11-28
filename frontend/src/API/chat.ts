import { BASE_URL } from '@constants/URLs';

export async function fetchMessages(
  campName: string | undefined
): Promise<any> {
  const response = await fetch(`${BASE_URL}/chats/${campName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('메세지 불러오기 실패');
  }
  const result = await response.json();
  return result;
}
