import Image from '@components/ui/Image';
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
          <Image
            src={image}
            className="aspect-square border-sm border-text-primary"
            width={32}
            height={32}
          />
          <div className="flex w-full items-center justify-between">
            <span
              className={`hidden text-text-primary xl:inline ${
                isActive ? 'display-regular-16' : 'display-light-16'
              }`}
            >
              {text}
            </span>
            {hasPostNotice && (
              <span className="display-regular-12 animate-bounce">🔵</span>
            )}
            {hasChatNotice && (
              <span className="display-regular-12 animate-bounce">🟡</span>
            )}
          </div>
        </>
      )}
    </NavLink>
  );
}

export default SubscribeMenuButton;
