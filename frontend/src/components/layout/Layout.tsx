import SideMenu from '@components/menu/SideMenu';
import SubscribedMenu from '@components/menu/SubscribedMenu';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const { pathname } = useLocation();
  const fixScroll = 'h-screen overflow-y-hidden';

  return (
    <div className="relative flex w-full justify-between">
      <SideMenu />
      <main
        className={`min-w-[48rem] flex-1 ${
          pathname.endsWith('chat') ? fixScroll : ''
        }`}
      >
        <div
          className={`content ${pathname !== '/feed' ? 'py-2xl' : 'px-2xl'}`}
        >
          <Outlet />
        </div>
      </main>
      <SubscribedMenu />
    </div>
  );
}
