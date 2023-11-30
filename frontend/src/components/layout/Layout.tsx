import SideMenu from '@components/menu/SideMenu';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  return (
    <main className="relative flex w-[67.5rem] justify-between h-center">
      <SideMenu />
      <div
        className={`${location.pathname === '/feed' ? 'w-[55rem]' : 'content'}`}
      >
        <Outlet />
      </div>
    </main>
  );
}
