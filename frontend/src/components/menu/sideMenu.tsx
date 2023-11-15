import { Link, useLocation } from 'react-router-dom'
import Text from '../text/text'

interface SideMenuLinkProps {
  to: string
  text: string
  currentPath: string
}

const SideMenu = () => {
  const location = useLocation()

  return (
    <div className="sticky top-[0] left-[0] z-10 w-[12.5rem] h-[100vh] flex flex-col">
      <Link to={'/'}>
        <img src="/src/assets/icons/logo.png" alt="메인 로고" />
      </Link>
      <Hr />
      <SideMenuLink to={'/'} text="Home" currentPath={location.pathname} />
      <SideMenuLink to={'/search'} text="Search" currentPath={location.pathname} />
      <SideMenuLink to={'/explore'} text="Explore" currentPath={location.pathname} />
      <SideMenuLink to={'/components/demo'} text="Demo Component" currentPath={location.pathname} />
    </div>
  )
}

const SideMenuLink = ({ to, text, currentPath }: SideMenuLinkProps) => {
  return (
    <Link to={to}>
      <Text size={14} color={to === currentPath ? 'text-primary' : 'text-secondary'}>
        {text}
      </Text>
    </Link>
  )
}

const Hr = () => {
  return <hr className="border-0 h-[0.0625rem] bg-text-primary" />
}

export default SideMenu
