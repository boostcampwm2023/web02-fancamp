import DummyData from './dummyData.json';

export const getPostById = (postId: string): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = DummyData.posts.find((post) => post.postId === postId);
      resolve(res);
    }, 10);
  });
};
