import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { Post } from '../../../types/api/post';
import useFetch from '../../../hooks/useFetch';
import PostGrid from '../../../components/grid/postGrid';
import UploadCard from '../../../components/card/uploadCard';
import PostCard from '../../../components/card/postCard';

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
      useFetch(`/api/posts/camp/${campId}`, {
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
