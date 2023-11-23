import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import DemoPage from '../pages/demo/components/demoPage';
import HomePage from '../pages/home';
import SearchPage from '../pages/search';
import ExplorePage from '../pages/explore';
import SigninPage from '../pages/auth/signin';
import SignupPage from '../pages/auth/signup';
import ChatPage from '../pages/camps/chat';
import PostPage from '../pages/camps/post/postPage';
import CampPage from '../pages/camps/campPage';
import CommunityPage from '../pages/camps/community/communityPage';
import ApiPage from '../pages/demo/api/apiPage';
import EditPage from '../pages/camps/edit/editPage';
import Layout from '../components/Layout';
import ErrorPage from '../pages/error';
import ProfilePage from '../pages/camps/edit/profile/profilePage';
import PasswordPage from '../pages/camps/edit/password/passwordPage';
import UploadPage from '../pages/camps/upload/uploadPage';
import AuthProtectedRoute from './AuthProtectedRoute';
import SubscriptionsPage from '../pages/subscriptions';

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
        <Route path="/camps/:campId/upload" element={<UploadPage />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="/demo/components" element={<DemoPage />} />
        <Route path="/demo/api/rest" element={<ApiPage />} />
        <Route path="/demo/api/scenario" element={<ApiPage />} />
      </Route>
    </Route>
  )
);

export default router;
