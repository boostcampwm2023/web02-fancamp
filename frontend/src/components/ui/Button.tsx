interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

function Button(props: ButtonProps) {
  const { text, className, ...buttonProps } = props;

  const buttonClassName = `display-regular-14 border-sm bg-point-yellow p-[0.25rem] ${
    className || ''
  }`;

  return (
    <button {...buttonProps} type="button" className={buttonClassName}>
      {text}
    </button>
  );
}

export default Button;
