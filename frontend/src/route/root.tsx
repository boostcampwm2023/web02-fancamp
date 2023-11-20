import { Outlet } from 'react-router-dom';
import SideMenu from '../components/menu/sideMenu';

function Root() {
  return (
    <main className="relative flex w-[67.5rem] justify-between h-center">
      <SideMenu />
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
}

export default Root;
