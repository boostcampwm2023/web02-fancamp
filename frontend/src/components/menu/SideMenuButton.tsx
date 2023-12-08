import { NavLink } from 'react-router-dom';

interface SideMenuLinkButtonProps {
  text: string;
  to: string;
  icon?: React.ReactNode;
}

interface SideMenuButtonProps {
  text: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function SideMenuLinkButton({
  text,
  to,
  icon,
}: SideMenuLinkButtonProps) {
  return (
    <NavLink to={to} className="group flex items-center gap-md px-lg py-md">
      {({ isActive }) => (
        <>
          {icon && (
            <div className="flex h-xl w-xl items-center justify-center">
              {icon}
            </div>
          )}
          <span
            className={`hidden text-text-primary xl:inline ${
              isActive ? 'display-regular-16' : 'display-regular-16'
            }`}
          >
            {text}
          </span>
        </>
      )}
    </NavLink>
  );
}

export function SideMenuButton({ text, onClick, icon }: SideMenuButtonProps) {
  return (
    <button
      type="button"
      className="group flex items-center gap-md px-lg py-md"
      onClick={onClick}
    >
      {icon && (
        <div className="flex h-xl w-xl items-center justify-center">{icon}</div>
      )}
      <span className="hidden text-text-primary display-regular-16 xl:inline">
        {text}
      </span>
    </button>
  );
}
