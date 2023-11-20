import { Link, useLocation } from 'react-router-dom';
import Text from '../text/text';

interface SideMenuLinkProps {
  to: string;
  text: string;
  currentPath: string;
}

function SideMenu() {
  const location = useLocation();

  return (
    <div className="sticky left-[0] top-[0] z-10 flex h-[100vh] w-[12.5rem] flex-col">
      <Link to="/">
        <img src="/src/assets/icons/logo.png" alt="메인 로고" />
      </Link>
      <Hr />
      <div className="flex flex-col gap-sm pb-sm pt-sm">
        <SideMenuLink to="/" text="Home" currentPath={location.pathname} />
        <SideMenuLink
          to="/search"
          text="Search"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="/explore"
          text="Explore"
          currentPath={location.pathname}
        />
      </div>
      <Hr />
      <div className="flex flex-col gap-sm pb-sm pt-sm">
        <SideMenuLink
          to="/auth/signin"
          text="로그인"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="/auth/signup"
          text="회원가입"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="/camps/0b5060ce-dfb4-4497-b0bf-34c6b7fce368/post"
          text="캠프"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="/camps/0b5060ce-dfb4-4497-b0bf-34c6b7fce368/chat"
          text="> 채팅"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="/camps/0b5060ce-dfb4-4497-b0bf-34c6b7fce368/post"
          text="> 포스트"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="/demo/components"
          text="컴포넌트 데모"
          currentPath={location.pathname}
        />
        <SideMenuLink
          to="demo/api/rest"
          text="Mock Api"
          currentPath={location.pathname}
        />
      </div>
    </div>
  );
}

function SideMenuLink({ to, text, currentPath }: SideMenuLinkProps) {
  return (
    <Link to={to} className="flex pb-sm pl-md pr-md pt-sm">
      <Text
        size={14}
        color={to === currentPath ? 'text-primary' : 'text-secondary'}
      >
        {text}
      </Text>
    </Link>
  );
}

function Hr() {
  return <hr className="h-[0.0625rem] border-0 bg-contour-primary" />;
}

export default SideMenu;
