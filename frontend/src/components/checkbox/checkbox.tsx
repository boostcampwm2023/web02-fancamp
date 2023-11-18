interface CheckboxProps {
  checked: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

function Checkbox({ checked, onClick, children }: CheckboxProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-xs"
      onClick={onClick}
    >
      <input type="checkbox" className="sr-only" />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className={`relative inline-block h-[0.75rem] w-[0.75rem] border-sm border-text-primary ${
          checked ? 'bg-point-yellow' : 'bg-surface-primary'
        }`}
      />
      {children}
    </button>
  );
}

export default Checkbox;
