import {
  useMutation,
  useSuspenseQueries,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { Post } from '../../../types/api/post';
import { CampInfo } from '../../../types/api/camp';
import ImageSlider from '../../../components/slider/ImageSlider';
import ProfileImage from '../../../components/profile/ProfileImage';
import Text from '../../../components/ui/Text';
import CloseIcon from '../../../assets/icons/closeIcon.svg?react';
import LikeButton from '../../../components/button/LikeButton';
import { formatDate } from '../../../utils/date';

interface PostModalTemplateProps {
  postId: string | null;
  handlePostModalClose: () => void;
}

function PostModal({ postId, handlePostModalClose }: PostModalTemplateProps) {
  const { campId } = useParams();
  const [like, setLike] = useState<boolean>(false);

  const [{ data: post }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['post', postId],
        queryFn: (): Promise<Post> =>
          useFetch(`/api/posts/${postId}`, {
            method: 'GET',
            credentials: 'include',
          }),
        gcTime: 0,
        staleTime: 0,
      },
      // {
      //   queryKey: ['post-comments', postId],
      //   queryFn: (): Promise<Comment[]> =>
      //     fetch(`/api/posts/${postId}/comments`).then((res) => res.json()),
      //   gcTime: 0,
      //   staleTime: 0,
      // },
    ],
  });

  const { data: camp } = useSuspenseQuery({
    queryKey: ['camp', post.campId],
    queryFn: (): Promise<CampInfo> =>
      useFetch(`/api/camps/${campId}`, {
        method: 'GET',
        credentials: 'include',
      }),
  });

  const { data: isLiked } = useSuspenseQuery({
    queryKey: ['like', postId],
    queryFn: (): Promise<any[]> =>
      useFetch(`/api/posts/likes/${postId}`, {
        method: 'GET',
        credentials: 'include',
      }),
  });

  useEffect(() => {
    setLike(!!isLiked.length);
  }, [isLiked]);

  // const commentProfiles = useSuspenseQueries({
  //   queries: comments.data.map((comment) => {
  //     const { userId } = comment;
  //     return {
  //       queryKey: ['user-profile', userId],
  //       queryFn: (): Promise<User> =>
  //         fetch(`/api/users/${comment.userId}`).then((res) => res.json()),
  //     };
  //   }),
  // });

  const postLikeMutation = useMutation({
    mutationFn: () =>
      useFetch(`/api/posts/likes/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ postId }),
        credentials: 'include',
      }),
    onSuccess: () => {
      // const { likeCount } = data;
      // queryClient.setQueryData(['post', postId], {
      //   ...post.data,
      //   likeCount,
      // });
      setLike(!like);
    },
  });

  return (
    <div className="flex h-[31.25rem]">
      {post.urls?.length ? (
        <div className="w-[37.5rem]">
          <ImageSlider images={post.urls.map((url) => url.imageUrl)} />
        </div>
      ) : (
        <></>
      )}
      <div className="flex w-[17.5rem] flex-col justify-between">
        <div className="cool-scrollbar flex flex-1 flex-col gap-md overflow-y-scroll p-md">
          <div className="flex flex-col gap-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-md">
                <ProfileImage
                  src=""
                  width={32}
                  height={32}
                  className="rounded-full border-sm border-text-primary"
                />
                <Text size={12}>{camp.campName}</Text>
              </div>
              <button
                type="button"
                aria-label="post modal close button"
                onClick={handlePostModalClose}
              >
                <CloseIcon />
              </button>
            </div>
            <Text size={14}>{post.content}</Text>
            <div className="flex justify-between">
              <LikeButton
                liked={like}
                onClick={() => {
                  postLikeMutation.mutate();
                }}
              >
                <Text size={12}>좋아요</Text>
                {/* <Text size={12}>좋아요 {numberToString(post.likeCount)}</Text> */}
              </LikeButton>
              <Text size={12} color="text-secondary" className="text-end">
                {formatDate(post.createdAt)}
              </Text>
            </div>
          </div>
          <hr className="border-[0] border-b-sm border-contour-primary" />
          {/* <div className="flex flex-col gap-md p-sm">
              <Text size={12}>{comments.data.length}개의 코멘트</Text>
              <ul className="flex flex-col gap-lg">
                {comments.data.map((commentData, index) => {
                  const { commentId, comment, createdAt } = commentData;
                  return (
                    <CommentCard
                      comment={comment}
                      createdAt={createdAt}
                      profile={commentProfiles[index].data}
                      key={`comment-${commentId}`}
                    />
                  );
                })}
              </ul>
            </div> */}
        </div>
      </div>
    </div>
  );
}

export default PostModal;
