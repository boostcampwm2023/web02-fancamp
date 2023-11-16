import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './styles/index.css'
import router from './route/router'

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
