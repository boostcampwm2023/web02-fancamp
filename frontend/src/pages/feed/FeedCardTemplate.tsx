import Text from '@components/ui/Text';
import { Camp } from '@type/api/camp';
import { Post } from '@type/api/post';
import { WheelEvent, useEffect, useRef } from 'react';
import CommentCard from '@components/card/CommentCard';
import { Comment } from '@type/api/comment';
import InputComment from '@components/input/InputComment';
import PostConentCard from '@components/card/PostConentCard';
import Hr from '@components/ui/Hr';
import useIntersectionObserver from '@hooks/useObserver';
import MediaSlider from '@components/slider/MediaSlider';
import useLanguage from '@hooks/useLanguage';

interface FeedCardTemplateProps {
  camp: Camp;
  post: Post;
  profileImage: string;
  isLike: boolean;
  comments: any;
  newComments: Comment[];
  inputComment: string;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleLike: () => void;
  commentStatus: {
    isError: boolean;
    isPending: boolean;
  };
  scrollRef: React.RefObject<HTMLDivElement>;
  fetchComments: () => Promise<any>;
  publicId: string | null;
  deleteComment: any;
}

function FeedCardTemplate({
  camp,
  post,
  profileImage,
  isLike,
  comments,
  newComments,
  inputComment,
  setInputComment,
  handleCommentSubmit,
  handleLike,
  commentStatus,
  scrollRef,
  fetchComments,
  publicId,
  deleteComment,
}: FeedCardTemplateProps) {
  const observerRef = useRef<HTMLDivElement>(null);
  const { observe } = useIntersectionObserver(() => {
    fetchComments();
  });
  const { language } = useLanguage();

  useEffect(() => {
    if (observerRef.current) {
      observe(observerRef.current);
    }
  }, []);

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
    <div
      className="relative mb-[5vh] mt-[5vh] flex h-[70vh] flex-col border-sm border-text-primary bg-text-primary"
      onTransitionEnd={(e) => e.stopPropagation()}
    >
      {post.url.length !== 0 && (
        <div className="h-[18rem] w-full">
          <MediaSlider width={32} medias={post.url} />
        </div>
      )}
      <div
        className="cool-scrollbar flex flex-1 flex-col overflow-y-auto bg-surface-primary"
        onWheel={handleWheel}
        ref={scrollRef}
      >
        <PostConentCard
          profileImage={profileImage}
          campName={camp.campName}
          content={
            post.translation?.find((item) => item.languageCode === language)
              ?.content || post.content
          }
          createdAt={post.createdAt}
          handleLike={handleLike}
          isLike={isLike}
          likeCount={post.likeCount}
        />
        <Hr color="text-secondary">
          <Text size={13} color="point-blue">
            {post.commentCount}개의 코멘트
          </Text>
        </Hr>
        <ul className="flex flex-col gap-lg pb-lg">
          {newComments.map((comment: Comment) => (
            <CommentCard
              comment={comment}
              key={`comment-${comment.commentId}`}
              isMine={comment.publicId === publicId}
              deleteComment={deleteComment}
            />
          ))}
          {comments.pages.map((commentPage: any) =>
            commentPage.result.map((comment: any) => (
              <CommentCard
                comment={comment}
                key={`comment-${comment.commentId}`}
                isMine={comment.publicId === publicId}
                deleteComment={deleteComment}
              />
            ))
          )}

          <div ref={observerRef} className="h-[0.0625rem]" />
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
