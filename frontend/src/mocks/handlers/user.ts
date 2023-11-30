import { HttpResponse, delay, http } from 'msw';
import UserInfo from '../dummy/userInfo.json';
import { CampEditable } from '@type/api/camp';

export const handlers = [
  // 특정 유저 정보 가져오기
  http.get('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    const user = UserInfo.find((u) => u.userId === userId);
    return HttpResponse.json(user);
  }),
  // 특정 유저 정보 업데이트
  http.patch('/api/users/:userId', async ({ request, params }) => {
    await delay(1000);
    const { userId } = params;
    const { userName } = (await request.json()) as Partial<CampEditable>;
    const userIndex = UserInfo.findIndex((u) => u.userId === userId);
    if (userName !== undefined) {
      UserInfo[userIndex].userName = userName;
    }
    return HttpResponse.json(UserInfo[userIndex]);
  }),
];
