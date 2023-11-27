import SideMenu from '@components/menu/SideMenu';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className="relative flex w-[67.5rem] justify-between h-center">
      <SideMenu />
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}
