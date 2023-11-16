import Text from '../text/text'

interface DropdownItemProps {
  text: string
  icon?: React.ReactNode
  handleOnClick: (text: string) => void
}

const DropdownItem = ({ text, icon, handleOnClick }: DropdownItemProps) => {
  return (
    <li
      className="h-[2rem] flex items-center gap-sm pt-xs pb-xs pl-md pr-md cursor-pointer bg-surface-primary hover:bg-point-lavender"
      onClick={() => handleOnClick(text)}
    >
      {icon && icon}
      <Text size={14} color="text-primary">
        {text}
      </Text>
    </li>
  )
}

export default DropdownItem
