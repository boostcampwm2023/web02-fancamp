import { signout } from '@API/auth';
import { noticeSocket } from '@API/socket';
import useAuth from '@hooks/useAuth';
import useSubscriptions from '@hooks/useSubscriptions';
import { Link, NavLink } from 'react-router-dom';
import {
  authMenu,
  camperMenu,
  mainMenu,
  masterMenu,
} from '@constants/sideMenu';
import useNoticeSocket from '@hooks/useNotice';

export default function SideMenu() {
  const { auth } = useAuth();
  const { subscribedCamps } = useSubscriptions();
  const { campsWithChatNotice, campsWithPostNotice } = useNoticeSocket(
    noticeSocket,
    auth
  );

  const handleSignout = async () => {
    await signout();
    window.location.reload();
  };

  return (
    <aside className="m-2xl min-w-[12.5rem]">
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
          masterMenu.map(({ to, text }) => {
            const campIdTo = to.replace(':campId', auth.publicId);
            return <SideMenuNavLink key={text} to={campIdTo} text={text} />;
          })}
        {auth?.isMaster === false &&
          camperMenu.map(({ to, text }) => (
            <SideMenuNavLink key={text} to={to} text={text} />
          ))}
        {subscribedCamps?.map(({ campName, bannerImage }) => (
          <div className="flex items-center px-md" key={campName}>
            <div className="overflow-hidden rounded">
              <img
                className="h-[36px] w-[36px] object-cover"
                width={36}
                height={36}
                src={bannerImage}
              />
            </div>
            <SideMenuNavLink to={`/camps/${campName}`} text={campName} />
            {campsWithPostNotice.includes(campName) ? (
              <span className="animate-bounce display-regular-12">🔵</span>
            ) : (
              ''
            )}
            {campsWithChatNotice.includes(campName) ? (
              <span className="animate-bounce display-regular-12">🟡</span>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </aside>
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
