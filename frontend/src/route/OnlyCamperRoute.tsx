import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function OnlyCamperRoute() {
  const { auth } = useAuth();

  if (auth?.isMaster) {
    return <Navigate to="/" replace />;
  }

  return auth ? <Outlet /> : <Navigate to="/" replace />;
}