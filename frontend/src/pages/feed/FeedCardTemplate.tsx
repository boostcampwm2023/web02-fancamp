import PostConentCard from '@components/card/PostContentCard';
import ImageSlider from '@components/slider/ImageSlider';
import Text from '@components/ui/Text';
import { Camp } from '@type/api/camp';
import { Post } from '@type/api/post';
import { WheelEvent } from 'react';
import CommentCard from '@components/card/CommentCard';
import { Comment } from '@type/api/comment';
import InputComment from '@components/input/InputComment';

interface FeedCardTemplateProps {
  camp: Camp;
  post: Post;
  isLike: boolean;
  comments: Comment[];
  inputComment: string;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleLike: () => void;
  commentStatus: {
    isError: boolean;
    isPending: boolean;
  };
  scrollRef: React.RefObject<HTMLDivElement>;
}

function FeedCardTemplate({
  camp,
  post,
  isLike,
  comments,
  inputComment,
  setInputComment,
  handleCommentSubmit,
  handleLike,
  commentStatus,
  scrollRef,
}: FeedCardTemplateProps) {
  const isOverflow = () => {
    if (scrollRef.current) {
      const { clientHeight, scrollHeight } = scrollRef.current;
      return clientHeight < scrollHeight;
    }
    return false;
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (isOverflow()) {
      event.stopPropagation();
    }
  };

  return (
    <div className="relative mb-[5vh] mt-[5vh] flex h-[70vh] flex-col gap-[0.0625rem] border-sm border-text-primary bg-text-primary">
      {post.url.length !== 0 && (
        <div className="h-[16rem] w-full">
          <ImageSlider width={27} images={post.url.map((url) => url.fileUrl)} />
        </div>
      )}
      <div
        className="cool-scrollbar flex flex-1 flex-col overflow-y-auto bg-surface-primary"
        onWheel={handleWheel}
        ref={scrollRef}
      >
        <PostConentCard
          campName={camp.campName}
          content={post.content}
          createdAt={post.createdAt}
          handleLike={handleLike}
          isLike={isLike}
          likeCount={post.likeCount}
        />
        <Text size={12} className="relative mt-sm h-center">
          {post.commentCount}개의 코멘트
        </Text>
        <ul className="flex flex-col gap-lg p-md">
          {comments.map((comment) => (
            <CommentCard
              comment={comment}
              key={`comment-${comment.commentId}`}
            />
          ))}
        </ul>
      </div>
      <InputComment
        comment={inputComment}
        setComment={setInputComment}
        handleCommentSubmit={handleCommentSubmit}
        status={commentStatus}
      />
    </div>
  );
}

export default FeedCardTemplate;
