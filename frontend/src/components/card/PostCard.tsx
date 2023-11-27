import Image from '../ui/Image';
import Text from '../ui/Text';

interface PostCardProps {
  imageSrc: string;
  likeCount: number;
  commentCount: number;
  postId: string;
  content: string;
  handleOnClick: (postId: string) => void;
}

const cardClassName =
  'group relative aspect-square h-full w-full ' +
  'cursor-pointer overflow-hidden border-sm border-text-primary';
const cardImageClassName =
  'smooth-transition aspect-square object-cover ' +
  'group-hover:scale-[1.1] group-hover:blur-[0.125rem] group-hover:brightness-[30%]';
const cardTextClassName =
  'smooth-transition relative h-full w-full overflow-hidden p-xl ' +
  'group-hover:scale-[1.1] group-hover:bg-text-primary group-hover:bg-opacity-90 group-hover:blur-[0.125rem] ' +
  '[&>span]:text-limit-line-5 [&>span]:v-center [&>span]:relative [&>span]:leading-[1.25rem]';
const cardHoverClassName =
  'smooth-transition absolute top-[0] flex h-full w-full ' +
  'flex-col items-center justify-center gap-sm opacity-0 group-hover:opacity-100';

function PostCard({
  imageSrc,
  likeCount,
  commentCount,
  postId,
  content,
  handleOnClick,
}: PostCardProps) {
  return (
    <button
      type="button"
      className={cardClassName}
      onClick={() => handleOnClick(postId)}
    >
      {imageSrc ? (
        <Image src={imageSrc} className={cardImageClassName} alt="" />
      ) : (
        <div className={cardTextClassName}>
          <Text color="text-secondary">{content}</Text>
        </div>
      )}
      <div className={cardHoverClassName}>
        <Text size={12} color="surface-primary">
          좋아요 {likeCount}
        </Text>
        <Text size={12} color="surface-primary">
          코멘트 {commentCount}
        </Text>
      </div>
    </button>
  );
}

export default PostCard;
