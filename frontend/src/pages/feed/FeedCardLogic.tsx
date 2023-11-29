import Spinner from '@components/loading/Spinner';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Comment } from '@type/api/comment';
import { getPostQuery } from '@hooks/api/usePostQuery';
import { getCampQuery } from '@hooks/api/useCampQuery';
import {
  getCommentsQuery,
  postCommentMutation,
} from '@hooks/api/useCommentQuery';
import { queryClient } from '@contexts/QueryProvider';
import { deleteLikeMutation, postLikeMutation } from '@hooks/api/useLikeQuery';
import FeedCardTemplate from './FeedCardTemplate';

interface FeedCardProps {
  postId: number;
}

function FeedCard({ postId }: FeedCardProps) {
  return (
    <Suspense
      fallback={
        <div className="relative mb-[5vh] mt-[5vh] h-[70vh] border-sm border-text-primary">
          <Spinner className="absolute center" />
        </div>
      }
    >
      <FeedCardLogic postId={postId} />
    </Suspense>
  );
}

function FeedCardLogic({ postId }: any) {
  const [isLike, setLike] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCommentsUpdated, setCommentsUpdated] = useState<boolean>(false);

  if (!postId) {
    return <div className="relative mb-[5vh] mt-[5vh] h-[70vh]" />;
  }

  const { data: post } = getPostQuery(postId);
  const { data: camp } = getCampQuery(post.publicId);
  const { data: comments } = getCommentsQuery(postId);

  const {
    mutate: postComment,
    isError: isPostCommentError,
    isPending: isPostCommentPending,
  } = postCommentMutation({
    onSuccess: (newComment: Comment) => {
      const newCommentObject = {
        ...newComment,
        profileImage: '',
        publicId: '',
      };
      queryClient.setQueryData(
        ['comments', postId],
        [...comments, newCommentObject]
      );
      queryClient.setQueryData(['post', postId], {
        ...post,
        commentCount: post.commentCount + 1,
      });
      setInputComment('');
      setCommentsUpdated(true);
    },
  });
  const { mutate: postLike, isPending: isPostLikePending } = postLikeMutation({
    onSuccess: () => {
      setLike(true);
      queryClient.setQueryData(['post', postId], {
        ...post,
        likeCount: post.likeCount + 1,
      });
    },
  });
  const { mutate: deleteLike, isPending: isDeleteLikePending } =
    deleteLikeMutation({
      onSuccess: () => {
        setLike(false);
        queryClient.setQueryData(['post', postId], {
          ...post,
          likeCount: post.likeCount - 1,
        });
      },
    });

  useEffect(() => {
    setLike(post.isLike);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isCommentsUpdated) {
      scrollRef.current.scrollTo({ top: 9999999, behavior: 'smooth' });
      setCommentsUpdated(false);
    }
  }, [isCommentsUpdated]);

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isPostCommentPending) {
      postComment({ postId, content: inputComment });
    }
  };

  const handleLike = () => {
    if (isPostLikePending || isDeleteLikePending) {
      return;
    }
    if (isLike) {
      deleteLike({ postId });
    } else {
      postLike({ postId });
    }
  };

  return (
    <FeedCardTemplate
      camp={camp}
      post={post}
      isLike={isLike}
      comments={comments}
      inputComment={inputComment}
      setInputComment={setInputComment}
      handleCommentSubmit={handleCommentSubmit}
      handleLike={handleLike}
      commentStatus={{
        isError: isPostCommentError,
        isPending: isPostCommentPending,
      }}
      scrollRef={scrollRef}
    />
  );
}

export default FeedCard;