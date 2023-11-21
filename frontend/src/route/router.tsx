import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './root';
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/auth">
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/camps" element={<CampPage />}>
          <Route path=":campId" element={<Outlet />}>
            <Route path="chat" element={<ChatPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="post" element={<PostPage />} />
            <Route path="edit" element={<EditPage />} />
          </Route>
        </Route>
        <Route path="/demo/components" element={<DemoPage />} />
        <Route path="/demo/api/rest" element={<ApiPage />} />
        <Route path="/demo/api/scenario" element={<ApiPage />} />
      </Route>
    </>
  )
);

export default router;
