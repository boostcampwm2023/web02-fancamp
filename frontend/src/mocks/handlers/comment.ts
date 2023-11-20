import { HttpResponse, http } from 'msw';
import Comment from '../dummy/comment.json';

export const handlers = [
  // 특정 포스트의 모든 코멘트 가져오기
  http.get('/api/posts/:postId/comments', ({ params }) => {
    const { postId } = params;
    const comments = Comment.filter((comment) => comment.postId === postId);
    return HttpResponse.json(comments);
  }),
];
