import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '@hooks/useAuth';
import PostGrid from '@components/grid/PostGrid';
import UploadCard from '@components/card/UploadCard';
import PostCard from '@components/card/PostCard';
import { getCampPostsQuery } from '@hooks/api/useCampQuery';
import { Post } from '@type/api/post';
import { useEffect, useState } from 'react';
import { postSocket } from '@API/socket';

interface PostGridProps {
  handlePostModalOpen: (postId: string) => void;
  handleUploadModalOpen: () => void;
}

function PostPageGrid({
  handlePostModalOpen,
  handleUploadModalOpen,
}: PostGridProps) {
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const { campId } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (!campId) {
    navigate('/');
    return <></>;
  }

  const { data: posts } = getCampPostsQuery(campId);

  useEffect(() => {
    const handleCreatePost = (data: any) => {
      setNewPosts([data, ...newPosts]);
    };

    postSocket.connect();
    postSocket.emit('enterPostPage', { campName: campId });
    postSocket.on('createPost', handleCreatePost);

    return () => {
      postSocket.emit('leavePostPage', { campName: campId });
      postSocket.off('createPost', handleCreatePost);
    };
  }, []);

  return (
    <PostGrid>
      {auth?.isMaster && <UploadCard onClick={handleUploadModalOpen} />}
      {newPosts.map((post) => {
        const { postId, content, url, likeCount, commentCount } = post;
        return (
          <PostCard
            postId={String(postId)}
            likeCount={likeCount}
            commentCount={commentCount}
            handleOnClick={handlePostModalOpen}
            content={content}
            key={`new-post-card-${postId}`}
            imageSrc={url.length ? url[0].fileUrl : ''}
          />
        );
      })}
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
