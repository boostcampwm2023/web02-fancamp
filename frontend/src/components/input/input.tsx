interface InputProps<State>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  setValue?: React.Dispatch<React.SetStateAction<State>>;
}

const inputClassName =
  'placeholder:display-regular-14 flex-1 bg-transparent p-sm focus:outline-none ';
const inputBorderClassName =
  'smooth-transition mb-4 border-b-sm border-text-primary ' +
  'group-focus-within:border-b-sm group-focus-within:border-point-blue';

function Input<State>(props: InputProps<State>) {
  const { label, icon, setValue, ...inputProps } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      const { value } = event.currentTarget;
      setValue(value as State);
    }
  };

  return (
    <div className="group flex w-full flex-col">
      {label && <span className="mb-2 display-regular-14">{label}</span>}
      <div className="flex flex-row items-center">
        {icon && icon}
        <input
          {...inputProps}
          className={
            inputClassName +
            (inputProps.type !== 'password' && 'display-regular-14 ') +
            (inputProps.className || '')
          }
          onChange={handleOnChange}
        />
      </div>
      <div className={inputBorderClassName} />
    </div>
  );
}

export default Input;
