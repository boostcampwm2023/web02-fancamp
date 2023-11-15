import { Outlet } from 'react-router-dom'
import SideMenu from '../components/menu/sideMenu'

const Root = () => {
  return (
    <main className="w-[67.5rem] flex justify-between relative h-center">
      <SideMenu />
      <div className="content__wrapper">
        <Outlet />
      </div>
    </main>
  )
}

export default Root
