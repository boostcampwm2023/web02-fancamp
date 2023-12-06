import Spinner from '@components/loading/Spinner';
import { Suspense, memo, useEffect, useRef, useState } from 'react';
import { Comment } from '@type/api/comment';
import { getPostQuery } from '@hooks/api/usePostQuery';
import { getCampQuery } from '@hooks/api/useCampQuery';
import {
  deleteCommentMutation,
  getCommentsInfiniteQuery,
  postCommentMutation,
} from '@hooks/api/useCommentQuery';
import { queryClient } from '@contexts/QueryProvider';
import { deleteLikeMutation, postLikeMutation } from '@hooks/api/useLikeQuery';
import { getProfileByIdQuery } from '@hooks/api/useUserQuery';
import useAuth from '@hooks/useAuth';
import FeedCardTemplate from './FeedCardTemplate';

interface FeedCardProps {
  postId: number;
}

const FeedCard = memo(function FeedCard({ postId }: FeedCardProps) {
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
});

function FeedCardLogic({ postId }: FeedCardProps) {
  const [isLike, setLike] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCommentsUpdated, setCommentsUpdated] = useState<boolean>(false);
  const [newComments, setNewComments] = useState<Comment[]>([]);
  const { auth } = useAuth();

  if (!postId) {
    return <div className="relative mb-[5vh] mt-[5vh] h-[70vh]" />;
  }

  const { data: post } = getPostQuery(postId);
  const { data: camp } = getCampQuery(post.publicId);
  const {
    data: comments,
    fetchNextPage: fetchComments,
    updateQueryData: updateComments,
  } = getCommentsInfiniteQuery(postId);
  const {
    data: { profileImage },
  } = getProfileByIdQuery(post.publicId);

  const {
    mutate: postComment,
    isError: isPostCommentError,
    isPending: isPostCommentPending,
  } = postCommentMutation({
    onSuccess: (newComment: Comment) => {
      setNewComments([newComment, ...newComments]);
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
  const { mutate: deleteComment } = deleteCommentMutation({
    onSuccess: (_, variables) => {
      const { commentId } = variables;
      setNewComments((currNewComment) =>
        currNewComment.filter((comment) => comment.commentId !== commentId)
      );
      queryClient.setQueryData(['post', postId], {
        ...post,
        commentCount: post.commentCount - 1,
      });

      updateComments(commentId);

      //   setQueryData(data => ({
      //     ...data,
      //     pages: data.pages.map(page => page.map(todo => todo.id === id ? { ...todo, name: 'new name' } : todo ))
      // })
    },
  });

  useEffect(() => {
    setLike(post.isLike);
  }, []);

  useEffect(() => {
    if (scrollRef.current && isCommentsUpdated) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
      profileImage={profileImage}
      isLike={isLike}
      comments={comments}
      newComments={newComments}
      inputComment={inputComment}
      setInputComment={setInputComment}
      handleCommentSubmit={handleCommentSubmit}
      handleLike={handleLike}
      commentStatus={{
        isError: isPostCommentError,
        isPending: isPostCommentPending,
      }}
      scrollRef={scrollRef}
      fetchComments={fetchComments}
      publicId={auth?.publicId || null}
      deleteComment={deleteComment}
    />
  );
}

export default FeedCard;
