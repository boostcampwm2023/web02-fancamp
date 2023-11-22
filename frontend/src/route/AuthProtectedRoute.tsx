import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AuthProtectedRoute() {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/auth/signin" replace />;
  }

  return auth ? <Outlet /> : <Navigate to="/auth/signin" replace />;
}
