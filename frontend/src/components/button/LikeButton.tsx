import Text from '@components/ui/Text';
import { formatDate } from '@utils/date';
import { numberToString } from '@utils/unit';

interface LikeButtonProps {
  isMaster: boolean;
  isLike: boolean;
  createdAt: string;
  likeCount: number;
  handleLike: () => void;
}

interface ButtonProps {
  liked: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

function LikeButton({
  isMaster,
  isLike,
  createdAt,
  likeCount,
  handleLike,
}: LikeButtonProps) {
  return (
    <div className="flex justify-between">
      {isMaster ? (
        <Text size={13}>좋아요 {numberToString(likeCount)}</Text>
      ) : (
        <Button liked={isLike} onClick={handleLike}>
          <Text size={13}>좋아요 {numberToString(likeCount)}</Text>
        </Button>
      )}
      <Text size={13} color="text-secondary" className="text-end">
        {formatDate(createdAt)}
      </Text>
    </div>
  );
}

function Button({ liked, onClick, children }: ButtonProps) {
  return (
    <button
      type="button"
      className="relative flex cursor-pointer items-center gap-sm"
      onClick={onClick}
    >
      <input type="checkbox" className="sr-only" defaultChecked={liked} />
      <svg
        className={`${liked && 'fill-point-red'}`}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.13106 3.70946L7.99972 5.23461L8.8688 3.7097C9.52623 2.55617 10.67 2.00682 11.8173 2.00682C13.4735 2.00682 15 3.12374 15 5.22114C15 6.43331 14.2819 7.80295 12.8399 9.53016C11.7772 10.803 10.4305 12.1488 8.91293 13.6653C8.61494 13.9631 8.31036 14.2675 8.00005 14.5792C7.68875 14.2665 7.38321 13.9611 7.0843 13.6624C5.5681 12.1471 4.22247 10.8022 3.16036 9.53014C1.71821 7.80288 1 6.43326 1 5.22114C1 3.12658 2.53062 2 4.18733 2C5.3281 2 6.46913 2.54727 7.13106 3.70946Z"
          stroke="#FF5044"
          strokeWidth="2"
        />
      </svg>
      {children}
    </button>
  );
}

export default LikeButton;
