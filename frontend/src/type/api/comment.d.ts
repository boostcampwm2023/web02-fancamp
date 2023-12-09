export interface Comment {
  commentId: number;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  publicId: string;
  profileImage: string;
  setimentColorHex: string;
  translation: {
    languageCode: 'en' | 'ko' | 'ja';
    content: string;
  }[];
}

export interface CommentResponse {
  cursor: string | null;
  nextCursor: string | null;
  result: Comment[];
}
