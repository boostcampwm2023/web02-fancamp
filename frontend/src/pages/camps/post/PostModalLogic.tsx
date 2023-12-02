import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostQuery } from '@hooks/api/usePostQuery';
import { getCampQuery } from '@hooks/api/useCampQuery';
import {
  getCommentsInfiniteQuery,
  postCommentMutation,
} from '@hooks/api/useCommentQuery';
import { deleteLikeMutation, postLikeMutation } from '@hooks/api/useLikeQuery';
import { queryClient } from '@contexts/QueryProvider';
import { Comment } from '@type/api/comment';
import PostModalTemplate from './PostModalTemplate';

interface PostModalLogicProps {
  postId: string;
  handlePostModalClose: () => void;
}

function PostModalLogic({ postId, handlePostModalClose }: PostModalLogicProps) {
  const [isLike, setLike] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>('');
  const { campId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCommentsUpdated, setCommentsUpdated] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  if (!campId) {
    navigate('/');
    return <></>;
  }

  const { data: post } = getPostQuery(postId);
  const { data: camp } = getCampQuery(campId);
  const { data: commentsPages, fetchNextPage: fetchComments } =
    getCommentsInfiniteQuery(postId);

  const {
    mutate: postComment,
    isError: isPostCommentError,
    isPending: isPostCommentPending,
  } = postCommentMutation({
    onSuccess: (newComment: Comment) => {
      setComments([newComment, ...comments]);
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
    setComments([...comments, ...(commentsPages.pages.at(-1)?.result || [])]);
  }, [commentsPages.pages.length]);

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
    <PostModalTemplate
      camp={camp}
      post={post}
      isLike={isLike}
      comments={comments}
      inputComment={inputComment}
      setInputComment={setInputComment}
      handlePostModalClose={handlePostModalClose}
      handleCommentSubmit={handleCommentSubmit}
      handleLike={handleLike}
      commentStatus={{
        isError: isPostCommentError,
        isPending: isPostCommentPending,
      }}
      scrollRef={scrollRef}
      fetchComments={fetchComments}
    />
  );
}

export default PostModalLogic;
