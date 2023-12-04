import LikeButton from '@components/button/LikeButton';
import CloseButton from '@assets/icons/closeIcon.svg?react';
import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import useAuth from '@hooks/useAuth';
import { Link } from 'react-router-dom';

interface PostConentCardProps {
  profileImage: string;
  campName: string;
  content: string;
  createdAt: string;
  isLike: boolean;
  likeCount: number;
  handleLike: () => void;
  handlePostModalClose?: () => void;
}

function PostConentCard({
  profileImage,
  campName,
  content,
  createdAt,
  isLike,
  likeCount,
  handleLike,
  handlePostModalClose,
}: PostConentCardProps) {
  const { auth } = useAuth();

  return (
    <div className="flex flex-col gap-md p-md">
      <div className="flex items-center justify-between">
        <Link to={`/camps/${campName}/post`}>
          <div className="flex items-center gap-sm">
            <ProfileImage src={profileImage} width={32} height={32} />
            <Text>{campName}</Text>
          </div>
        </Link>
        {handlePostModalClose && (
          <button
            type="button"
            onClick={handlePostModalClose}
            aria-label="Close Modal"
          >
            <CloseButton />
          </button>
        )}
      </div>
      <div>
        <Text>{content}</Text>
      </div>
      <LikeButton
        isMaster={auth?.isMaster || false}
        isLike={isLike}
        createdAt={createdAt}
        likeCount={likeCount}
        handleLike={handleLike}
      />
    </div>
  );
}

export default PostConentCard;
