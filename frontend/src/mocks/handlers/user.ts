import { HttpResponse, http } from 'msw';
import UserInfo from '../dummy/userInfo.json';

export const handlers = [
  // 특정 유저 정보 가져오기
  http.get('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    const user = UserInfo.find((u) => u.userId === userId);
    return HttpResponse.json(user);
  }),
];
