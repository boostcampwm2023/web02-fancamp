import { signout } from '@API/auth';
import useAuth from '@hooks/useAuth';
import { Link } from 'react-router-dom';
import {
  AUTH_MENU,
  CAMPER_MENU,
  COMMON_MENU,
  DOC_MENU,
  MASTER_MENU,
} from '@constants/sideMenu';
import Image from '@components/ui/Image';
import SignoutIcon from '@assets/icons/signoutIcon.svg?react';
import { SideMenuButton, SideMenuLinkButton } from './SideMenuButton';
import { IS_SIGNED_IN } from '@constants/localStorageKeys';

export default function SideMenu() {
  const { auth } = useAuth();

  const handleSignout = async () => {
    await signout();
    localStorage.setItem(IS_SIGNED_IN, 'false');
    window.location.reload();
  };

  return (
    <aside className="flex w-[5rem] flex-col border-r-sm border-text-primary xl:w-[18.75rem]">
      <Link to="/">
        <div className="flex h-[6.25rem] w-full overflow-x-hidden">
          <Image
            className="block h-full w-full xl:hidden"
            src="https://kr.object.ncloudstorage.com/fancamp/static/smallLogo.png"
            alt="작은 메인 로고"
          />
          <Image
            className="hidden xl:block"
            src="https://kr.object.ncloudstorage.com/fancamp/static/bigLogo.png"
            height={100}
            alt="큰 메인 로고"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {COMMON_MENU.map(({ to, text, icon }) => (
            <SideMenuLinkButton
              key={`side-menu-${text}`}
              to={to}
              text={text}
              icon={icon}
            />
          ))}
          {auth
            ? auth.isMaster
              ? MASTER_MENU.map(({ to, text, icon }) => {
                  const campIdTo = to.replace(':campId', auth.publicId);
                  return (
                    <SideMenuLinkButton
                      key={`side-menu-${text}`}
                      to={campIdTo}
                      text={text}
                      icon={icon}
                    />
                  );
                })
              : CAMPER_MENU.map(({ to, text, icon }) => (
                  <SideMenuLinkButton
                    key={`side-menu-${text}`}
                    to={to}
                    text={text}
                    icon={icon}
                  />
                ))
            : null}
          {auth ? (
            <SideMenuButton
              onClick={handleSignout}
              text="로그아웃"
              icon={<SignoutIcon width={28} />}
            />
          ) : (
            AUTH_MENU.map(({ to, text, icon }) => (
              <SideMenuLinkButton
                key={`side-menu-${text}`}
                to={to}
                text={text}
                icon={icon}
              />
            ))
          )}
        </div>
        <div className="mb-lg flex flex-col">
          {DOC_MENU.map(({ to, text, icon }) => (
            <SideMenuLinkButton
              key={`side-menu-${text}`}
              to={to}
              text={text}
              icon={icon}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
