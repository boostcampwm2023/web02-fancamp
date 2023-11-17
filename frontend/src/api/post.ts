import { useEffect, useState } from 'react';
import {
  dummyGetCommentsByPostId,
  dummyGetPostsByCampId,
} from '../dummy/api/post';

export interface Post {
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  images: string[];
}
export interface Comment {
  postId: string;
  userId: string;
  comment: string;
  createdAt: string;
}

export const getPostsByCampIdHook = (campId: string) => {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    dummyGetPostsByCampId(campId)
      .then((res) => JSON.parse(res))
      .then((data) => setPosts(data));
  }, [campId]);

  return posts;
};

export const getCommentsByPostIdHook = (postId: string | null) => {
  const [comments, setComments] = useState<Comment[] | null>(null);

  useEffect(() => {
    if (postId) {
      dummyGetCommentsByPostId(postId)
        .then((res) => JSON.parse(res))
        .then((data) => setComments(data));
    } else {
      setComments(null);
    }
  }, [postId]);

  return comments;
};
