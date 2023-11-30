import { BASE_URL } from '@constants/URLs';

interface InfiniteMessageResponse {
  cursor: string;
  nextCursor: string;
  result: any[];
}

interface InfiniteMessageParameters {
  campName: string | undefined;
  pageParam: any;
}

export async function fetchInfiniteMessages({
  campName,
  pageParam: cursor,
}: InfiniteMessageParameters): Promise<InfiniteMessageResponse> {
  const response = await fetch(
    `${BASE_URL}/chats/${campName}?cursor=${cursor}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );
  if (!response.ok) {
    throw new Error('메세지 불러오기 실패');
  }
  const result = await response.json();
  return result;
}
