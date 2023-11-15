import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Root from './root'
import DemoPage from '../pages/demo/demoPage'
import HomePage from '../pages/home/homePage'
import SearchPage from '../pages/search/searchPage'
import ExplorePage from '../pages/explore/explorePage'
import SigninPage from '../pages/auth/signin'
import SignupPage from '../pages/auth/signup'
import ChatPage from '../pages/camps/chat'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/auth">
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Route>
      <Route path="/camps/:campId">
        <Route path="chat" element={<ChatPage />} />
      </Route>
      <Route path="/components/demo" element={<DemoPage />} />
    </Route>
  )
)

export default router
