import { createBrowserRouter } from 'react-router-dom'
import DemoPage from '../pages/components/demo/demoPage'

const router = createBrowserRouter([
    {
        path: '/components/demo',
        element: <DemoPage />,
    },
])

export default router
