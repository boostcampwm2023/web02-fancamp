import { useState } from 'react';
import {
  Post,
  getCommentsByPostIdHook,
  getPostsByCampIdHook,
} from '../../../api/post';
import { useParams } from 'react-router-dom';
import Modal from '../../../components/modal/modal';
import ImageSlider from '../../../components/slider/imageSlider';
import PostGrid from '../../../components/post/postGrid';
import Button from '../../../components/button/button';
import PostCard from '../../../components/post/postCard';
import Text from '../../../components/text/text';

const PostPage = () => {
  const { campId } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const posts = getPostsByCampIdHook(String(campId));
  const comments = getCommentsByPostIdHook(post?.postId || null);

  const handleModalOpen = (postId: string) => {
    const detailPost = posts?.find((post) => post.postId === postId) || null;
    setPost(detailPost);
    console.log(detailPost?.images.length);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setPost(null);
    setModalOpen(false);
  };

  return (
    <section>
      <Modal isOpen={isModalOpen} setOpen={handleModalClose}>
        {post && (
          <div className="flex h-[31.25rem]">
            {post.images.length && (
              <div className="w-[37.5rem]">
                <ImageSlider images={post.images} />
              </div>
            )}
            <div className="flex w-[17.5rem] flex-col justify-between">
              <div className="flex flex-1 flex-col gap-xl overflow-y-scroll">
                <Text size={14}>{post.content}</Text>
                {comments &&
                  comments.map((comment, index) => {
                    return (
                      <Text
                        size={12}
                        color="point-blue"
                        key={`post-comment-${index}`}
                      >
                        {comment.comment}
                        {comment.comment}
                        {comment.comment}
                      </Text>
                    );
                  })}
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <Text size={12}>좋아요: {post.likeCount}</Text>
                  <Text size={12}>코멘트: {post.commentCount}</Text>
                </div>
                <Button text="닫기" handleOnClick={handleModalClose} />
              </div>
            </div>
          </div>
        )}
      </Modal>
      <PostGrid>
        {posts &&
          posts.map((post, index) => {
            const { postId, images, likeCount, commentCount, content } = post;
            return (
              <PostCard
                imageSrc={images[0]}
                likeCount={likeCount}
                commentCount={commentCount}
                postId={postId}
                handleOnClick={handleModalOpen}
                content={content}
                key={`post-card-${index}`}
              />
            );
          })}
      </PostGrid>
    </section>
  );
};

export default PostPage;
