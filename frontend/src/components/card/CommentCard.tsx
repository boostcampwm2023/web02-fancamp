import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import { Comment } from '@type/api/comment';
import { formatDate } from '@utils/date';

interface CommentProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentProps) {
  const { profileImage, createdAt, content, setimentColorHex, publicId } =
    comment;
  return (
    <li className="gamd flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-sm">
          <ProfileImage
            src={profileImage}
            width={24}
            height={24}
            className="border-xs rounded-full border-text-primary"
          />
          <Text size={13}>{publicId}</Text>
        </div>
        <Text size={13} color="text-secondary" className="text-end">
          {formatDate(createdAt)}
        </Text>
      </div>
      <Text
        size={14}
        weight={300}
        className="break-all pl-sm pr-sm"
        style={{
          background: `linear-gradient(90deg, ${setimentColorHex}40 0%, ${setimentColorHex}50 86.15%, ${setimentColorHex}70 100%)`,
        }}
      >
        {content}
      </Text>
    </li>
  );
}

export default CommentCard;
