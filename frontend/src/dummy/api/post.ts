import Post from '../json/post.json';
import Comment from '../json/comment.json';

export const dummyGetPostsByCampId = (campId: string) => {
  return new Promise<string>((resolve) => {
    const posts = Post.filter((post) => post.userId === campId);
    const processedPosts = posts.map((post) => {
      const images = post.images.split(',');
      if (images.length === 1 && !images[0]) {
        images.pop();
      }
      return { ...post, images };
    });
    resolve(JSON.stringify(processedPosts));
  });
};

export const dummyGetCommentsByPostId = (postId: string) => {
  return new Promise<string>((resolve) => {
    const comments = Comment.filter((comment) => comment.postId === postId);
    resolve(JSON.stringify(comments));
  });
};
