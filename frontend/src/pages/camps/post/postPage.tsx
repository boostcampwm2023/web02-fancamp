import { Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import Modal from '../../../components/modal/modal';
import ImageSlider from '../../../components/slider/imageSlider';
import PostGrid from '../../../components/post/postGrid';
import Button from '../../../components/button/button';
import PostCard from '../../../components/post/postCard';
import Text from '../../../components/text/text';
import { Post } from '../../../types/api/post';
import { Comment } from '../../../types/api/comment';

interface PostGridTemplateProps {
  handleModalOpen: (postId: string) => void;
}

interface PostModalTemplateProps {
  postId: string | null;
  handleModalClose: () => void;
}

function PostPage() {
  const [showModal, setModal] = useState(false);
  const [showPostId, setPostId] = useState<string | null>(null);

  const handleModalOpen = (postId: string) => {
    setPostId(postId);
    setModal(true);
  };

  const handleModalClose = () => {
    setPostId(null);
    setModal(false);
  };

  return (
    <section>
      {showModal && (
        <Modal isOpen={showModal} setOpen={handleModalClose}>
          <Suspense fallback={<div>로딩중</div>}>
            <PostModalTemplate
              postId={showPostId}
              handleModalClose={handleModalClose}
            />
          </Suspense>
        </Modal>
      )}
      <Suspense fallback={<div>로딩중</div>}>
        <PostGridTemplate handleModalOpen={handleModalOpen} />
      </Suspense>
    </section>
  );
}

function PostGridTemplate({ handleModalOpen }: PostGridTemplateProps) {
  const { campId } = useParams();

  const { data: posts } = useSuspenseQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetch(`/api/posts/camp/${campId}`).then((res) => res.json()),
  });

  return (
    <PostGrid>
      {posts.map((post) => {
        const { postId, images, likeCount, commentCount, content } = post;
        return (
          <PostCard
            imageSrc={images[0]}
            likeCount={likeCount}
            commentCount={commentCount}
            postId={postId}
            handleOnClick={handleModalOpen}
            content={content}
            key={`post-card-${postId}`}
          />
        );
      })}
    </PostGrid>
  );
}

function PostModalTemplate({
  postId,
  handleModalClose,
}: PostModalTemplateProps) {
  const [post, comments] = useSuspenseQueries({
    queries: [
      {
        queryKey: [`post-${postId}`],
        queryFn: (): Promise<Post> =>
          fetch(`/api/posts/${postId}`).then((res) => res.json()),
        gcTime: 0,
        staleTime: 0,
      },
      {
        queryKey: [`post-${postId}-comment`],
        queryFn: (): Promise<Comment[]> =>
          fetch(`/api/posts/${postId}/comments`).then((res) => res.json()),
        gcTime: 0,
        staleTime: 0,
      },
    ],
  });

  return (
    <div className="flex h-[31.25rem]">
      {post.data.images.length && (
        <div className="w-[37.5rem]">
          <ImageSlider images={post.data.images} />
        </div>
      )}
      <div className="flex w-[17.5rem] flex-col justify-between">
        <div className="flex flex-1 flex-col gap-xl overflow-y-scroll">
          <Text size={14}>{post.data.content}</Text>
          {comments.data.map((comment) => {
            return (
              <Text
                size={12}
                color="point-blue"
                key={`post-comment-${comment.commentId}`}
              >
                {comment.comment}
              </Text>
            );
          })}
        </div>
        <div className="flex flex-col">
          <div className="flex">
            <Text size={12}>좋아요: {post.data.likeCount}</Text>
            <Text size={12}>코멘트: {post.data.commentCount}</Text>
          </div>
          <Button text="닫기" onClick={handleModalClose} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
