/* eslint-disable react/button-has-type */

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

const buttonClassName =
  ' display-regular-14 border-sm bg-point-yellow p-sm shadow-[0px_0px_0px_rgba(0,0,0)] ' +
  '[&:hover]:mt-[-2px] [&:hover]:ml-[-2px] [&:hover]:shadow-[4px_4px_0px_rgba(0,0,0)] ' +
  'transition-all duration-200 ';

function Button(props: ButtonProps) {
  const { type = 'button', children, className, ...buttonProps } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClassName + (className || '')}
    >
      {children}
    </button>
  );
}

export default Button;
