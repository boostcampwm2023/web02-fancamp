import Image from '../image/Image';
import Text from '../text/text';

interface PostCardProps {
  imageSrc: string;
  likeCount: number;
  commentCount: number;
  postId: string;
  content: string;
  handleOnClick: (postId: string) => void;
}

const PostCard = ({
  imageSrc,
  likeCount,
  commentCount,
  postId,
  content,
  handleOnClick,
}: PostCardProps) => {
  return (
    <div className="post__card" onClick={() => handleOnClick(postId)}>
      {imageSrc ? (
        <Image
          src={imageSrc}
          className="post__card__image post__card--hover--filter"
          alt=""
        />
      ) : (
        <div className="post__card__content post__card--hover--filter">
          <Text color="text-secondary">{content}</Text>
        </div>
      )}
      <div className="post__info">
        <Text size={12} color="surface-primary">
          좋아요 {likeCount}
        </Text>
        <Text size={12} color="surface-primary">
          코멘트 {commentCount}
        </Text>
      </div>
    </div>
  );
};

export default PostCard;
