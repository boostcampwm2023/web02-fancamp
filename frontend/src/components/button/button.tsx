interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

const Button = (props: ButtonProps) => {
  const className =
    'display-regular-14 border-sm bg-point-yellow p-[0.25rem] ' +
    (props.className || '');

  return (
    <button {...props} className={className}>
      {props.text}
    </button>
  );
};

export default Button;
