interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  setValue: (value: string) => void;
}

const TextAreaClassName =
  'h-[20rem] w-full resize-none p-md ' +
  'border-sm border-text-primary text-text-primary display-regular-14 ' +
  'focus:outline-none focus:border-point-blue selection:bg-point-lavender leading-[10rem]';

function TextArea(props: TextAreaProps) {
  const { className, setValue, ...textAreaProps } = props;

  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setValue) {
      const { value } = event.currentTarget;
      setValue(value as string);
    }
  };

  return (
    <textarea
      {...textAreaProps}
      className={`${TextAreaClassName} ${className || ''}`}
      onChange={handleOnChange}
    />
  );
}

export default TextArea;
