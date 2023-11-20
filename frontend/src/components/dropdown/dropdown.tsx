import { useEffect, useState } from 'react';
import BottomArrowIcon from '../../assets/icons/bottomArrowIcon.svg?react';
import Text from '../text/text';

interface DropdownProps {
  children: React.ReactNode;
  placeholder?: string;
  value: string | null;
}

function Dropdown({ children, placeholder, value }: DropdownProps) {
  const [showDropdown, setDropdown] = useState(false);

  useEffect(() => {
    const handleHideDropdown = (event: any) => {
      if (event.target.closest('.dropdown__wrapper')) {
        setDropdown(!showDropdown);
      } else {
        setDropdown(false);
      }
    };
    document.addEventListener('click', handleHideDropdown);
    return () => {
      document.removeEventListener('click', handleHideDropdown);
    };
  }, [showDropdown]);

  return (
    <div className="dropdown__wrapper relative">
      <button
        type="button"
        className="flex h-full w-full items-center gap-xs border-md border-text-primary bg-surface-primary p-xs"
      >
        <div className={`${showDropdown && 'rotate-180'}`}>
          <BottomArrowIcon />
        </div>
        <Text size={14} color={value ? 'text-primary' : 'text-secondary'}>
          {value || placeholder}
        </Text>
      </button>
      {showDropdown && (
        <ul className="absolute z-50 mt-[-0.125rem] flex w-full flex-col border-md border-text-primary bg-surface-primary">
          {children}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
