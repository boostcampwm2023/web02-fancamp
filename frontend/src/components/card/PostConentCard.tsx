import LikeButton from '@components/button/LikeButton';
import CloseButton from '@assets/icons/closeIcon.svg?react';
import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import useAuth from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import { optimizedImageURL } from '@utils/imageURL';

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
    <div className="flex flex-col gap-md p-lg">
      <div className="flex items-center justify-between">
        <Link to={`/camps/${campName}/post`}>
          <div className="flex items-center gap-sm">
            <ProfileImage
              src={optimizedImageURL(profileImage, 'profile-small')}
              width={32}
              height={32}
              className="rounded-full"
              alt={`${campName}'s profile`}
            />
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
        canLike={!!(auth && !auth.isMaster)}
        isLike={isLike}
        createdAt={createdAt}
        likeCount={likeCount}
        handleLike={handleLike}
      />
    </div>
  );
}

export default PostConentCard;
