import Text from '@components/ui/Text';

interface InputProps<State>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  errorMessage?: string;
  setValue?: React.Dispatch<React.SetStateAction<State>>;
}

const inputClassName =
  'placeholder:display-regular-14 flex-1 bg-transparent p-sm focus:outline-none ';
const inputBorderClassName =
  'smooth-transition border-b-sm border-text-primary ' +
  'group-focus-within:border-b-sm group-focus-within:border-point-blue';

function Input<State>(props: InputProps<State>) {
  const { label, icon, errorMessage, setValue, ...inputProps } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setValue) {
      const { value } = event.currentTarget;
      setValue(value as State);
    }
  };

  return (
    <div className="group flex w-full flex-col gap-xs">
      {label && <span className="display-regular-14">{label}</span>}
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
      <div className="flex h-[1rem] items-center justify-end">
        <Text size={12} color="point-red" className="text-right">
          {errorMessage}
        </Text>
      </div>
    </div>
  );
}

export default Input;
