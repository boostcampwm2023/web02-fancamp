import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './styles/index.css';
import App from './App';
import SigninPage from './pages/auth/signin';
import DemoPage from './pages/components/demo/demoPage';
import SignupPage from './pages/auth/signup';
import ChatPage from './pages/camps/chat';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />} />
      <Route path='/auth'>
        <Route path='signin' element={<SigninPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Route>
      <Route path='/camps/:campId'>
        <Route path='chat' element={<ChatPage />} />
      </Route>
      <Route path='/components/demo' element={<DemoPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
);
