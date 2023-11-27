import { BASE_URL } from '@constants/URLs';

export async function isSubscribedCamp(campName: string): Promise<any> {
  const NOT_SUBSCRIBED = 400;

  const response = await fetch(`${BASE_URL}/camps/subscriptions/${campName}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (response.status === NOT_SUBSCRIBED) {
    throw new Error('구독 안됨');
  }
  if (!response.ok) {
    throw new Error('구독 여부 확인 실패');
  }
  return response;
}

export async function subscribeCamp(campName: string): Promise<any> {
  const response = await fetch(`${BASE_URL}/camps/subscriptions/${campName}`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('구독 실패');
  }
  return response;
}
