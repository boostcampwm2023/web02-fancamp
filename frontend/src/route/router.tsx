import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Layout from '@components/layout/Layout';
import FeedPage from '@pages/feed/FeedPage';
import UserEditPage from '@pages/user/edit/ProfileEditPage';
import UserProfileEditPage from '@pages/user/edit/profile/UserProfileEditPage';
import UserPasswordEditPage from '@pages/user/edit/password/UserPasswordEditPage';
import CampProfileEditPage from '@pages/camps/edit/CampProfileEditPage';
import ErrorPage from '@pages/error/ErrorPage';
import SigninPage from '@pages/auth/signin/SigninPage';
import SignupPage from '@pages/auth/signup/SignupPage';
import HomePage from '@pages/home/HomePage';
import SearchPage from '@pages/search/SearchPage';
import ExplorePage from '@pages/explore/ExplorePage';
import SubscriptionsPage from '@pages/subscriptions/SubscriptionsPage';
import CampPage from '@pages/camps/CampPage';
import PostPage from '@pages/camps/post/PostPage';
import ChatPage from '@pages/camps/chat/ChatPage';
import AuthProtectedRoute from './AuthProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />}>
      <Route path="auth">
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="feed" element={<FeedPage />} />
        <Route path="subscriptions" element={<SubscriptionsPage />} />
        <Route path="camps" element={<CampPage />}>
          <Route path=":campId">
            <Route path="post" element={<PostPage />} />
            <Route element={<AuthProtectedRoute />}>
              <Route path="chat" element={<ChatPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="camps/edit" element={<CampProfileEditPage />} />
        <Route path="user/edit" element={<UserEditPage />}>
          <Route path="profile" element={<UserProfileEditPage />} />
          <Route path="password" element={<UserPasswordEditPage />} />
        </Route>
      </Route>
      <Route element={<AuthProtectedRoute />}>
        <Route path="error" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);

export default router;
