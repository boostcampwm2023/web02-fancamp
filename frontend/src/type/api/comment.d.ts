export interface Comment {
  commentId: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  publicId: string;
  profileImage: string;
  setimentColorHex: string;
}

export interface CommentResponse {
  cursor: string | null;
  nextCursor: string | null;
  result: Comment[];
}
