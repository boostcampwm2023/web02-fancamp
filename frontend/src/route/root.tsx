import { Outlet } from 'react-router-dom';
import SideMenu from '../components/menu/sideMenu';

const Root = () => {
  return (
    <main className="h-center relative flex w-[67.5rem] justify-between">
      <SideMenu />
      <div className="content">
        <Outlet />
      </div>
    </main>
  );
};

export default Root;
