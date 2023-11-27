import { BASE_URL } from '@constants/URLs';

export async function getMessages(campName: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/chats/${campName}`, {
    method: 'GEt',
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
