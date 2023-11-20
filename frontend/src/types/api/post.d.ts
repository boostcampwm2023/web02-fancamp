export interface Post {
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  images: string[];
}
