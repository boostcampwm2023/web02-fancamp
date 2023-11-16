import Text from '../text/text'

interface PostCardProps {
  imageSrc: string
  likeCount: number
  commentCount: number
  postId: string
  username: string
  handleOnClick: (postId: string) => void
}

const PostCard = ({
  imageSrc,
  likeCount,
  commentCount,
  postId,
  username,
  handleOnClick,
}: PostCardProps) => {
  return (
    <div className="post__card" onClick={() => handleOnClick(postId)}>
      <img src={imageSrc} className="post__card__image" alt="" />
      <div className="post__info">
        <Text size={12} color="surface-primary">
          좋아요 {likeCount}
        </Text>
        <Text size={12} color="surface-primary">
          코멘트 {commentCount}
        </Text>
      </div>
    </div>
  )
}

export default PostCard
