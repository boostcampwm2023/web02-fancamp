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
      <div className="flex flex-col gap-sm pt-sm pb-sm">
        <SideMenuLink to={'/'} text="Home" currentPath={location.pathname} />
        <SideMenuLink to={'/search'} text="Search" currentPath={location.pathname} />
        <SideMenuLink to={'/explore'} text="Explore" currentPath={location.pathname} />
      </div>
      <Hr />
      <div className="flex flex-col gap-sm pt-sm pb-sm">
        <SideMenuLink to={'/auth/signin'} text="로그인" currentPath={location.pathname} />
        <SideMenuLink to={'/auth/signup'} text="회원가입" currentPath={location.pathname} />
        <SideMenuLink to={'/camps/1/chat'} text="채팅" currentPath={location.pathname} />
        <SideMenuLink
          to={'/components/demo'}
          text="컴포넌트 데모"
          currentPath={location.pathname}
        />
      </div>
    </div>
  )
}

const SideMenuLink = ({ to, text, currentPath }: SideMenuLinkProps) => {
  return (
    <Link to={to} className="flex pl-md pr-md pt-sm pb-sm">
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
