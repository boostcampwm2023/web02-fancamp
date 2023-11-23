import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import DemoPage from '../pages/demo/components/demoPage';
import HomePage from '../pages/home/homePage';
import SearchPage from '../pages/search/searchPage';
import ExplorePage from '../pages/explore/explorePage';
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
          <Route path="chat" element={<ChatPage />} />
        </Route>
        <Route path="camps" element={<CampPage />}>
          <Route path=":campId">
            <Route path="community" element={<CommunityPage />} />
            <Route path="post" element={<PostPage />} />
          </Route>
          R
        </Route>
        <Route path="demo">
          <Route path="components" element={<DemoPage />} />
          <Route path="api/rest" element={<ApiPage />} />
          <Route path="api/scenario" element={<ApiPage />} />
        </Route>
        <Route path="error" element={<ErrorPage />} />
        <Route path="/camps/:campId/edit" element={<EditPage />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="password" element={<PasswordPage />} />
        </Route>
        <Route path="/camps/:campId/upload" element={<UploadPage />} />
        <Route path="/demo/components" element={<DemoPage />} />
        <Route path="/demo/api/rest" element={<ApiPage />} />
        <Route path="/demo/api/scenario" element={<ApiPage />} />
      </Route>
    </Route>
  )
);

export default router;
