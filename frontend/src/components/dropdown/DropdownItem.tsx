import Text from '../ui/Text';

interface DropdownItemProps {
  text: string;
  icon?: React.ReactNode;
  handleOnClick: (text: string) => void;
}

function DropdownItem({ text, icon, handleOnClick }: DropdownItemProps) {
  return (
    <button
      type="button"
      className="flex h-[2rem] cursor-pointer items-center gap-sm bg-surface-primary pb-xs pl-md pr-md pt-xs hover:bg-point-lavender"
      onClick={() => handleOnClick(text)}
    >
      {icon && icon}
      <Text size={14} color="text-primary">
        {text}
      </Text>
    </button>
  );
}

export default DropdownItem;
