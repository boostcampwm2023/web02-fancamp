import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { signout } from '../../api/auth';

const mainMenu = [
  { to: '/', text: 'Home' },
  { to: '/search', text: 'Search' },
  { to: '/explore', text: 'Explore' },
];

const secondaryMenu = [
  { to: '/camps/0b5060ce-dfb4-4497-b0bf-34c6b7fce368/post', text: '캠프' },
  { to: '/chat', text: '> 채팅' },
  { to: '/camps/0b5060ce-dfb4-4497-b0bf-34c6b7fce368/post', text: '> 포스트' },
  {
    to: '/camps/0b5060ce-dfb4-4497-b0bf-34c6b7fce368/edit',
    text: '> 캠프 수정',
  },
  { to: '/demo/components', text: '컴포넌트 데모' },
  { to: '/demo/api/rest', text: 'Mock Api' },
];

const authMenu = [
  { to: '/auth/signin', text: '로그인' },
  { to: '/auth/signup', text: '회원가입' },
];

export default function SideMenu() {
  const { auth } = useAuth();

  const handleSignout = async () => {
    await signout();
    window.location.reload();
  };

  return (
    <div className="sticky left-[0] top-[0] z-10 flex h-[100vh] w-[12.5rem] flex-col">
      <Link to="/">
        <img src="/src/assets/icons/logo.png" alt="메인 로고" />
      </Link>
      <Hr />
      <div className="flex flex-col gap-sm py-sm">
        {mainMenu.map(({ to, text }) => (
          <SideMenuNavLink key={text} to={to} text={text} />
        ))}
      </div>
      <Hr />
      <div className="flex flex-col gap-sm py-sm">
        {auth ? (
          <button type="button" className="flex" onClick={handleSignout}>
            <span className="px-md py-sm text-text-secondary display-regular-14">
              로그아웃
            </span>
          </button>
        ) : (
          authMenu.map(({ to, text }) => (
            <SideMenuNavLink key={text} to={to} text={text} />
          ))
        )}
        {secondaryMenu.map(({ to, text }) => (
          <SideMenuNavLink key={text} to={to} text={text} />
        ))}
      </div>
    </div>
  );
}

function Hr() {
  return <hr className="h-[0.0625rem] border-0 bg-contour-primary" />;
}

function SideMenuNavLink({ to, text }: { to: string; text: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          isActive ? 'text-text-primary' : 'text-text-secondary',
          'display-regular-14',
          'px-md py-sm',
        ].join(' ')
      }
    >
      {text}
    </NavLink>
  );
}
