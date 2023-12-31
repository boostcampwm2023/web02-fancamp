import ProfileImage from '@components/profile/ProfileImage';
import { NavLink } from 'react-router-dom';

interface SideMenuLinkButtonProps {
  text: string;
  to: string;
  image: string;
  hasPostNotice: boolean;
  hasChatNotice: boolean;
}

function SubscribeMenuButton({
  text,
  to,
  image,
  hasPostNotice,
  hasChatNotice,
}: SideMenuLinkButtonProps) {
  return (
    <NavLink to={to} className="group flex items-center gap-md px-lg py-md">
      {({ isActive }) => (
        <>
          <ProfileImage
            src={image}
            className="rounded-full"
            width={32}
            height={32}
          />
          <div className="flex w-full items-center justify-between">
            <span
              className={`hidden text-text-primary xl:inline ${
                isActive ? 'display-regular-16' : 'display-regular-16'
              }`}
            >
              {text}
            </span>
            <div className="display-regular-12 animate-bounce">
              {hasPostNotice && <span>🔵</span>}
              {hasChatNotice && <span>🟡</span>}
            </div>
          </div>
        </>
      )}
    </NavLink>
  );
}

export default SubscribeMenuButton;
