import { useEffect, useState } from 'react'
import BottomArrowIcon from '../../assets/icons/bottomArrowIcon.svg?react'
import Text from '../text/text'

interface DropdownProps {
  children: React.ReactNode
  placeholder?: string
  value: string | null
}

const Dropdown = ({ children, placeholder, value }: DropdownProps) => {
  const [showDropdown, setDropdown] = useState(false)

  useEffect(() => {
    const handleHideDropdown = (event: any) => {
      if (event.target.closest('.dropdown__wrapper')) {
        setDropdown(!showDropdown)
      } else {
        setDropdown(false)
      }
    }
    document.addEventListener('click', handleHideDropdown)
    return () => {
      document.removeEventListener('click', handleHideDropdown)
    }
  }, [showDropdown])

  return (
    <div className="dropdown__wrapper relative">
      <button
        type="button"
        className="w-full h-full flex items-center gap-xs p-xs border-md border-text-primary bg-surface-primary"
      >
        <div className={`${showDropdown && 'rotate-180'}`}>
          <BottomArrowIcon />
        </div>
        <Text size={14} color={value ? 'text-primary' : 'text-secondary'}>
          {value || placeholder}
        </Text>
      </button>
      {showDropdown && (
        <ul className="absolute flex flex-col border-md border-text-primary bg-surface-primary z-50 w-full mt-[-0.125rem]">
          {children}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
