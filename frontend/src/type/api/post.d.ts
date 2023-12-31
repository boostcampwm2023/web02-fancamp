export interface PostFile {
  fileUrl: string;
  mimetype: string;
}

export interface Post {
  campId: string;
  commentCount: number;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  isLike: boolean;
  isMaster: boolean;
  likeCount: number;
  pictureCount: number;
  postId: number;
  publicId: string;
  url: PostFile[];
  translation?: {
    languageCode: 'en' | 'ko' | 'ja';
    content: string;
  }[];
}
