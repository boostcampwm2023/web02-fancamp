interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  children?: React.ReactNode;
}

const Checkbox = ({ checked, onChange, children }: CheckboxProps) => {
  return (
    <span
      className="flex cursor-pointer items-center gap-xs"
      onClick={onChange}
    >
      <input type="checkbox" className="sr-only" />
      <label
        className={`relative inline-block h-[0.75rem] w-[0.75rem] border-sm border-text-primary ${
          checked ? 'bg-point-yellow' : 'bg-surface-primary'
        }`}
      />
      {children}
    </span>
  );
};

export default Checkbox;
