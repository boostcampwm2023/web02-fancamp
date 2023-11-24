import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AuthProtectedRoute() {
  const { auth } = useAuth();
  const location = useLocation();

  const state = {
    redirect: location.pathname,
  };

  if (!auth) {
    return <Navigate to="/auth/signin" replace state={state} />;
  }

  return auth ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}
