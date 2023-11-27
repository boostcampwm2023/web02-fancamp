export interface Post {
  campId: string;
  content: string;
  createdAt: string;
  isDeleted: boolean;
  isMaster: boolean;
  pictureCount: number;
  postId: number;
  userId: number;
  urls?: {
    imageUrl: string;
  }[];
}
