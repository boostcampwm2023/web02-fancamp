import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import PostGrid from '@components/grid/PostGrid';
import UploadCard from '@components/card/UploadCard';
import PostCard from '@components/card/PostCard';
import { BASE_URL } from '@constants/URLs';
import { getCampPostsQuery } from '@hooks/api/useCampQuery';

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
  const navigate = useNavigate();

  if (!campId) {
    navigate('/');
    return <></>;
  }

  const { data: posts } = getCampPostsQuery(campId);

  return (
    <PostGrid>
      {auth?.isMaster && <UploadCard onClick={handleUploadModalOpen} />}
      {posts.map((post) => {
        const { postId, content, url, likeCount, commentCount } = post;
        return (
          <PostCard
            postId={String(postId)}
            likeCount={likeCount}
            commentCount={commentCount}
            handleOnClick={handlePostModalOpen}
            content={content}
            key={`post-card-${postId}`}
            imageSrc={url.length ? url[0].fileUrl : ''}
          />
        );
      })}
    </PostGrid>
  );
}

export default PostPageGrid;
