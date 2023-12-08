import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import { Comment } from '@type/api/comment';
import { formatDate } from '@utils/date';
import DeleteIcon from '@assets/icons/deleteIcon.svg?react';

interface CommentProps {
  comment: Comment;
  isMine: boolean;
  deleteComment: any;
}

function CommentCard({ comment, isMine, deleteComment }: CommentProps) {
  const {
    profileImage,
    createdAt,
    content,
    setimentColorHex,
    publicId,
    postId,
    commentId,
  } = comment;
  return (
    <li className="group flex flex-col gap-md px-lg py-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <ProfileImage
            src={profileImage}
            width={24}
            height={24}
            className="rounded-full"
          />
          <Text size={13} color={isMine ? 'point-blue' : 'contour-primary'}>
            {publicId}
          </Text>
        </div>
        <div className="flex items-center gap-md">
          <Text size={13} color="text-secondary" className="text-end">
            {formatDate(createdAt)}
          </Text>
          {isMine && (
            <button
              type="button"
              aria-label="comment-delete-button"
              className="hidden group-hover:block"
              onClick={() => deleteComment({ postId, commentId })}
            >
              <DeleteIcon width={16} />
            </button>
          )}
        </div>
      </div>
      <Text
        size={14}
        weight={400}
        className="break-all pl-sm pr-sm"
        style={{
          background: `linear-gradient(90deg, ${setimentColorHex}40 0%, ${setimentColorHex}50 80%, ${setimentColorHex}70 100%)`,
        }}
      >
        {content}
      </Text>
    </li>
  );
}

export default CommentCard;
