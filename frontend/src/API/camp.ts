import { BASE_URL } from '@constants/URLs';

export async function getAllCamps() {
  const response = await fetch(`${BASE_URL}/camps`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('모든 캠프 목록 가져오기 실패');
  }
  const result = await response.json();
  return result;
}

export async function getSubscribedCamps() {
  const response = await fetch(`${BASE_URL}/camps/subscriptions`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('구독 캠프 목록 가져오기 실패');
  }
  const result = await response.json();
  return result;
}
