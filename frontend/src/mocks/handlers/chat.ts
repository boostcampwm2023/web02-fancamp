import { HttpResponse, delay, http } from 'msw';
import { faker } from '@faker-js/faker/locale/ko';

export const handlers = [
  http.get('/api/chat', async () => {
    await delay(1000);
    const newChats = Array(15)
      .fill(0)
      .map(() => faker.lorem.word());
    return HttpResponse.json(newChats);
  }),
];
