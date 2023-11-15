import { createBrowserRouter } from 'react-router-dom'
import DemoPage from '../pages/demo/demoPage'
import HomePage from '../pages/home/homePage'
import Root from './root'
import SearchPage from '../pages/search/searchPage'
import ExplorePage from '../pages/explore/explorePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
      {
        path: '/explore',
        element: <ExplorePage />,
      },
      {
        path: '/components/demo',
        element: <DemoPage />,
      },
    ],
  },
])

export default router
