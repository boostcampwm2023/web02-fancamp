import { signout } from '@API/auth';
import useAuth from '@hooks/useAuth';
import useSubscriptions from '@hooks/useSubscriptions';
import { Link, NavLink } from 'react-router-dom';

const mainMenu = [
  { to: '/', text: 'Home' },
  { to: '/search', text: 'Search' },
  { to: '/explore', text: 'Explore' },
  { to: '/feed', text: 'Feed' },
];

const authMenu = [
  { to: '/auth/signin', text: '로그인' },
  { to: '/auth/signup', text: '회원가입' },
];

const demoMenu = [
  { to: '/demo/components', text: '컴포넌트 데모' },
  { to: '/demo/api/rest', text: 'Mock Api' },
];

export default function SideMenu() {
  const { auth } = useAuth();
  const { subscribedCamps } = useSubscriptions();

  const masterMenu = [
    {
      to: `/camps/${auth?.publicId}/post`,
      text: '캠프',
    },
    { to: `/camps/${auth?.publicId}/chat`, text: '> 채팅' },
    {
      to: `/camps/${auth?.publicId}/post`,
      text: '> 포스트',
    },
    {
      to: `/camps/edit`,
      text: '> 캠프 수정',
    },
    {
      to: `/camps/${auth?.publicId}/upload`,
      text: '> 캠프 업로드',
    },
  ];

  const camperMenu = [
    {
      to: '/subscriptions',
      text: '구독한 캠프',
    },
    {
      to: '/user',
      text: '마이페이지',
    },
  ];

  const handleSignout = async () => {
    await signout();
    window.location.reload();
  };

  return (
    <div className="sticky left-[0] top-[0] z-10 flex h-[100vh] w-[12.5rem] flex-col">
      <Link to="/">
        <img
          src="https://kr.object.ncloudstorage.com/fancamp/static/logo.png"
          alt="메인 로고"
        />
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
        {auth?.isMaster &&
          masterMenu.map(({ to, text }) => (
            <SideMenuNavLink key={text} to={to} text={text} />
          ))}
        {auth?.isMaster === false &&
          camperMenu.map(({ to, text }) => (
            <SideMenuNavLink key={text} to={to} text={text} />
          ))}
        {demoMenu.map(({ to, text }) => (
          <SideMenuNavLink key={text} to={to} text={text} />
        ))}
        {subscribedCamps?.map(({ campName, bannerImage }) => (
          <div className="flex px-md" key={campName}>
            <div>
              <img width={40} height={40} src={bannerImage} />
            </div>
            <SideMenuNavLink to={`/camps/${campName}`} text={campName} />
          </div>
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
