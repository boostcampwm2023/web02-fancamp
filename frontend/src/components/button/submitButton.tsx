import Text from '../text/text';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const buttonClassName =
  'smooth-transition h-full w-full shadow-[0_0_0_0_#111111] ' +
  'hover:translate-x-[-0.125rem] hover:translate-y-[-0.125rem] hover:shadow-[0.25rem_0.25rem_0_0_#111111] ';
const buttonInnerClassName =
  'box-border flex items-center justify-center border-sm border-text-primary bg-point-lavender pb-[1rem] pt-[1rem]';

function SubmitButton(props: SubmitButtonProps) {
  const { text, className, ...submitButtonProps } = props;

  return (
    <button
      {...submitButtonProps}
      type="submit"
      className={buttonClassName + (className || '')}
    >
      <div className={buttonInnerClassName}>
        <Text size={14} color="text-primary">
          {text}
        </Text>
      </div>
    </button>
  );
}

export default SubmitButton;
