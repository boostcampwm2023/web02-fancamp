import JsonView from 'react18-json-view';
import { useState } from 'react';
import { Post } from '../../../types/api/post';
import Section from '../../../components/ui/Section';
import Text from '../../../components/ui/Text';
import Button from '../../../components/ui/Button';
import { User } from '../../../types/api/user';

const test = {
  userId: '0b5060ce-dfb4-4497-b0bf-34c6b7fce368',
  postId: '8399a21f-6acd-43e9-9a79-4496639c796f',
};

function ApiPage() {
  return (
    <div className=" flex flex-col gap-xl">
      <PostApiDemo />
      <CommentApiDemo />
      <UserApiDemo />
    </div>
  );
}

function PostApiDemo() {
  const { userId, postId } = test;
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const getPostsByUserId = () => {
    fetch(`/api/posts/camp/${userId}`)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };

  const getPostByPostId = () => {
    fetch(`/api/posts/${postId}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  };

  return (
    <Section>
      <Text size={20}>포스트 Api</Text>
      <Button
        text="특정 캠프의 모든 포스트 가져오기 => /api/posts/camp/:campId"
        onClick={getPostsByUserId}
      />
      <JsonView src={posts} />
      <hr />
      <Button
        text="특정 포스트 가져오기 => /api/posts/:postId"
        onClick={getPostByPostId}
      />
      <JsonView src={post} />
    </Section>
  );
}

function CommentApiDemo() {
  const { postId } = test;
  const [comments, setComments] = useState<Comment[]>([]);

  const getCommentsByPostId = () => {
    fetch(`/api/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  };

  return (
    <Section>
      <Text size={20}>코멘트 Api</Text>
      <Button
        text="특정 포스트의 모든 코멘트 가져오기 => /api/posts/:postId/comments"
        onClick={getCommentsByPostId}
      />
      <JsonView src={comments} />
    </Section>
  );
}

function UserApiDemo() {
  const { userId } = test;
  const [user, setUser] = useState<User | null>(null);

  const getUserByUserId = () => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  return (
    <Section>
      <Text size={20}>유저 Api</Text>
      <Button
        text="특정 유저 정보 가져오기 => /api/users/:userId"
        onClick={getUserByUserId}
      />
      <JsonView src={user} />
    </Section>
  );
}

export default ApiPage;
