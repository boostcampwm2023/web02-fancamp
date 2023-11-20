import { HttpResponse, delay, http } from 'msw';
import Post from '../dummy/post.json';

export const handlers = [
  // 특정 캠프의 모든 포스트 가져오기
  http.get('/api/posts/camp/:campId', async ({ params }) => {
    await delay(1000);
    const { campId } = params;
    const posts = Post.filter((post) => post.userId === campId);
    return HttpResponse.json(posts);
  }),
  // 특정 Post 가져오기
  http.get('/api/posts/:postId', async ({ params }) => {
    await delay(1000);
    const { postId } = params;
    const post = Post.find((p) => p.postId === postId);
    return HttpResponse.json(post);
  }),
  // 특정 Post 좋아요 기능
  http.put('/api/posts/:postId/like', async ({ request, params }) => {
    // await delay(1000);
    const { postId } = params;
    const postIndex = Post.findIndex((p) => p.postId === postId);
    const reqestBody = await request.json();
    // @ts-ignore
    const { like } = reqestBody;
    Post[postIndex].likeCount += like ? 1 : -1;
    return HttpResponse.json({ likeCount: Post[postIndex].likeCount });
  }),
];
