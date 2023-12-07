/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-curly-brace-presence */

import Text from '@components/ui/Text';
import CommentCard from '@components/card/CommentCard';
import { Post } from '@type/api/post';
import { Camp } from '@type/api/camp';
import { Comment } from '@type/api/comment';
import InputComment from '@components/input/InputComment';
import PostConentCard from '@components/card/PostConentCard';
import Hr from '@components/ui/Hr';
import { Fragment, useEffect, useRef } from 'react';
import useIntersectionObserver from '@hooks/useObserver';
import MediaSlider from '@components/slider/MediaSlider';
import useAuth from '@hooks/useAuth';
import useLanguage from '@hooks/useLanguage';

interface PostModalTemplateProps {
  camp: Camp;
  post: Post;
  profileImage: string;
  isLike: boolean;
  comments: any;
  newComments: Comment[];
  inputComment: string;
  setInputComment: React.Dispatch<React.SetStateAction<string>>;
  handlePostModalClose: () => void;
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

function PostModalTemplate({
  camp,
  post,
  profileImage,
  isLike,
  comments,
  newComments,
  inputComment,
  setInputComment,
  handlePostModalClose,
  handleCommentSubmit,
  handleLike,
  commentStatus,
  scrollRef,
  fetchComments,
  publicId,
  deleteComment,
}: PostModalTemplateProps) {
  const { auth } = useAuth();
  const { language } = useLanguage();
  const observerRef = useRef<HTMLDivElement>(null);
  const { observe } = useIntersectionObserver(() => {
    fetchComments();
  });

  useEffect(() => {
    if (observerRef.current) {
      observe(observerRef.current);
    }
  }, []);

  return (
    <div className="flex h-[31.25rem] border-sm border-text-primary">
      {post.url.length !== 0 && (
        <div className="w-[37.5rem]">
          <MediaSlider width={37.5} medias={post.url} isCurrnet />
        </div>
      )}
      <div
        className={`flex w-[20rem] flex-col justify-between ${
          post.url.length !== 0 && 'border-l-sm border-text-primary'
        }`}
      >
        <div
          className="cool-scrollbar flex flex-col overflow-y-auto border-text-primary"
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
            handlePostModalClose={handlePostModalClose}
            isLike={isLike}
            likeCount={post.likeCount}
          />
          <Hr color="text-secondary">
            <Text size={13} color="point-blue">
              {post.commentCount}개의 코멘트
            </Text>
          </Hr>
          <ul className="flex flex-col pb-lg">
            {newComments.map((comment: Comment) => {
              return (
                <CommentCard
                  key={`new-comment-${comment.commentId}`}
                  comment={comment}
                  isMine={comment.publicId === publicId}
                  deleteComment={deleteComment}
                />
              );
            })}
            {comments.pages.map((commentPage: any, index: number) => (
              <Fragment key={index}>
                {commentPage.result.map((comment: any) => (
                  <CommentCard
                    comment={comment}
                    key={`comment-${comment.commentId}`}
                    isMine={comment.publicId === publicId}
                    deleteComment={deleteComment}
                  />
                ))}
              </Fragment>
            ))}
            <div ref={observerRef} className="h-[0.0625rem]" />
          </ul>
        </div>
        {auth && (
          <InputComment
            comment={inputComment}
            setComment={setInputComment}
            handleCommentSubmit={handleCommentSubmit}
            status={commentStatus}
          />
        )}
      </div>
    </div>
  );
}

export default PostModalTemplate;
