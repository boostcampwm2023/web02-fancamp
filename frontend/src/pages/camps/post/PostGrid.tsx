import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import useAuth from '@hooks/useAuth';
import { Post } from '@type/api/post';
import useFetch from '@hooks/useFetch';
import PostGrid from '@components/grid/PostGrid';
import UploadCard from '@components/card/UploadCard';
import PostCard from '@components/card/PostCard';
import { BASE_URL } from '@constants/URLs';

interface PostGridProps {
  handlePostModalOpen: (postId: string) => void;
  handleUploadModalOpen: () => void;
}

function PostPageGrid({
  handlePostModalOpen,
  handleUploadModalOpen,
}: PostGridProps) {
  const { campId } = useParams();
  const { auth } = useAuth();

  const { data: posts } = useSuspenseQuery<Post[]>({
    queryKey: ['posts', campId],
    queryFn: () =>
      useFetch(`${BASE_URL}/posts/camp/${campId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  return (
    <PostGrid>
      {auth?.isMaster && <UploadCard onClick={handleUploadModalOpen} />}
      {posts.map((post) => {
        const { postId, content } = post;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const url = post?.url?.imageUrl;
        return (
          <PostCard
            likeCount={0}
            commentCount={0}
            postId={String(postId)}
            handleOnClick={handlePostModalOpen}
            content={content}
            key={`post-card-${postId}`}
            imageSrc={url || ''}
          />
        );
      })}
    </PostGrid>
  );
}

export default PostPageGrid;
