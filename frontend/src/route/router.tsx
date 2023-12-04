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
import UserPage from '@pages/user/UserPage';
import CampProfileEditPage from '@pages/camps/edit/CampProfileEditPage';
import HomePage from '../pages/home/HomePage';
import SearchPage from '../pages/search/SearchPage';
import ExplorePage from '../pages/explore/ExplorePage';
import SignupPage from '../pages/auth/signup/SignupPage';
import ChatPage from '../pages/camps/chat/ChatPage';
import PostPage from '../pages/camps/post/PostPage';
import CampPage from '../pages/camps/CampPage';
import ErrorPage from '../pages/error/ErrorPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import SubscriptionsPage from '../pages/subscriptions/SubscriptionsPage';
import SigninPage from '../pages/auth/signin/SigninPage';

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
        <Route element={<AuthProtectedRoute />}>
          <Route path="camps/:campId/chat" element={<ChatPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="camps" element={<CampPage />}>
            <Route path=":campId">
              <Route path="post" element={<PostPage />} />
            </Route>
          </Route>
          <Route path="camps/edit" element={<CampProfileEditPage />} />
        </Route>
        <Route element={<AuthProtectedRoute />}>
          <Route path="user" element={<UserPage />} />
          <Route path="user/edit" element={<UserEditPage />}>
            <Route path="profile" element={<UserProfileEditPage />} />
            <Route path="password" element={<UserPasswordEditPage />} />
          </Route>
        </Route>
        <Route path="error" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);

export default router;
