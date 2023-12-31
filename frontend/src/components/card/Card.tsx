interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const buttonClassName =
  'display-regular-14 border-sm shadow-[0px_0px_0px_rgba(0,0,0)] py-sm' +
  '[&:hover]:mt-[-2px] [&:hover]:ml-[-2px] [&:hover]:shadow-[4px_4px_0px_rgba(0,0,0)] ' +
  'transition-all duration-200 ';

function Card(props: ButtonProps) {
  const { children, className, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      type="button"
      className={buttonClassName + (className || '')}
    >
      {children}
    </button>
  );
}

export default Card;
