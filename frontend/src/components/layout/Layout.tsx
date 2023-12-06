import SideMenu from '@components/menu/SideMenu';
import SubscribedMenu from '@components/menu/SubscribedMenu';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative flex w-full justify-between">
      <SideMenu />
      <main className="min-w-[48rem] flex-1">
        <div
          className={`content ${location.pathname !== '/feed' ? '' : 'px-2xl'}`}
        >
          <Outlet />
        </div>
      </main>
      <SubscribedMenu />
    </div>
  );
}
