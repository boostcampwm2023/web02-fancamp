import { HttpResponse, http } from 'msw';
import Post from '../dummy/post.json';

interface PostLike {
  like: boolean;
}

export const handlers = [
  // 특정 캠프의 모든 포스트 가져오기
  http.get('/api/posts/camp/:campId', async ({ params }) => {
    const { campId } = params;
    const posts = Post.filter((post) => post.userId === campId);
    return HttpResponse.json(posts);
  }),
  // 특정 Post 가져오기
  http.get('/api/posts/:postId', async ({ params }) => {
    const { postId } = params;
    const post = Post.find((p) => p.postId === postId);
    return HttpResponse.json(post);
  }),
  // 특정 Post 좋아요 기능
  http.put('/api/posts/:postId/like', async ({ request, params }) => {
    const { postId } = params;
    const postIndex = Post.findIndex((p) => p.postId === postId);
    const { like } = (await request.json()) as PostLike;
    Post[postIndex].likeCount += like ? 1 : -1;
    return HttpResponse.json({ likeCount: Post[postIndex].likeCount });
  }),
];
