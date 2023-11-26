import { User } from '../../types/api/user';
import ProfileImage from '../profile/ProfileImage';
import Text from '../ui/Text';

interface CommentProps {
  comment: string;
  createdAt: string;
  profile: User;
}

function CommentCard({ comment, createdAt, profile }: CommentProps) {
  const { userName, profileUrl } = profile;
  return (
    <li className="gamd flex flex-col gap-sm">
      <div className="flex items-center gap-sm">
        <ProfileImage
          src={profileUrl}
          width={24}
          height={24}
          className="border-xs rounded-full border-text-primary"
        />
        <Text size={12}>{userName}</Text>
      </div>
      <Text size={14} weight={300}>
        {comment}
      </Text>
      <Text size={12} color="text-secondary" className="text-end">
        {createdAt}
      </Text>
    </li>
  );
}

export default CommentCard;
