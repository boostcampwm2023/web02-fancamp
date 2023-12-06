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
import { getProfileByIdQuery } from '@hooks/api/useUserQuery';
import { commentSocket } from '@API/socket';
import PostModalTemplate from './PostModalTemplate';

interface PostModalLogicProps {
  postId: number;
  handlePostModalClose: () => void;
}

function PostModalLogic({ postId, handlePostModalClose }: PostModalLogicProps) {
  const [isLike, setLike] = useState<boolean>(false);
  const [inputComment, setInputComment] = useState<string>('');
  const { campId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isCommentsUpdated, setCommentsUpdated] = useState<boolean>(false);
  const [newComments, setNewComments] = useState<Comment[]>([]);

  if (!campId) {
    navigate('/');
    return <></>;
  }

  const { data: post } = getPostQuery(postId);
  const { data: camp } = getCampQuery(campId);
  const { data: comments, fetchNextPage: fetchComments } =
    getCommentsInfiniteQuery(postId);
  const {
    data: { profileImage },
  } = getProfileByIdQuery(campId);

  const {
    mutate: postComment,
    isError: isPostCommentError,
    isPending: isPostCommentPending,
  } = postCommentMutation({
    onSuccess: () => {
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
    const handleCreatePost = (data: any) => {
      setNewComments((_) => [data, ..._]);
    };

    commentSocket.connect();

    commentSocket.emit('enterCommentPage', { postId });
    commentSocket.on('createComment', handleCreatePost);

    return () => {
      commentSocket.emit('leaveCommentPage', { postId });
      commentSocket.off('createComment', handleCreatePost);
    };
  }, [postId]);

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
    <PostModalTemplate
      camp={camp}
      post={post}
      profileImage={profileImage}
      isLike={isLike}
      comments={comments}
      newComments={newComments}
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
