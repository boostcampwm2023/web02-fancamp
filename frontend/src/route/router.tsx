import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import DemoPage from '../pages/demo/components/DemoPage';
import HomePage from '../pages/home/HomePage';
import SearchPage from '../pages/search/SearchPage';
import ExplorePage from '../pages/explore/ExplorePage';
import SignupPage from '../pages/auth/signup/SignupPage';
import ChatPage from '../pages/camps/chat/ChatPage';
import PostPage from '../pages/camps/post/PostPage';
import CampPage from '../pages/camps/CampPage';
import CommunityPage from '../pages/camps/community/CommunityPage';
import ApiPage from '../pages/demo/api/ApiPage';
import EditPage from '../pages/camps/edit/EditPage';
import ErrorPage from '../pages/error/ErrorPage';
import ProfilePage from '../pages/camps/edit/profile/ProfilePage';
import PasswordPage from '../pages/camps/edit/password/PasswordPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import SubscriptionsPage from '../pages/subscriptions/SubscriptionsPage';
import SigninPage from '../pages/auth/signin/SigninPage';
import Layout from '@components/layout/Layout';

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
        <Route element={<AuthProtectedRoute />}>
          <Route path="camps/:campId/chat" element={<ChatPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="camps" element={<CampPage />}>
            <Route path=":campId">
              <Route path="community" element={<CommunityPage />} />
              <Route path="post" element={<PostPage />} />
            </Route>
          </Route>
          <Route path="/camps/:campId/edit" element={<EditPage />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="password" element={<PasswordPage />} />
          </Route>
        </Route>
        <Route path="error" element={<ErrorPage />} />
        <Route path="/demo/components" element={<DemoPage />} />
        <Route path="/demo/api/rest" element={<ApiPage />} />
        <Route path="/demo/api/scenario" element={<ApiPage />} />
      </Route>
    </Route>
  )
);

export default router;
