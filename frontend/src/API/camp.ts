import { BASE_URL } from '@constants/URLs';
import { Camp } from '@type/api/camp';

export async function fetchSubscribedCamps(): Promise<Camp[]> {
  const response = await fetch(`${BASE_URL}/camps/subscriptions`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('구독 캠프 목록 가져오기 실패');
  }
  const result = await response.json();
  return result;
}
